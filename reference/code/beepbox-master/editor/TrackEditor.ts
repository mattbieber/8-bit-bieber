// Copyright (C) 2020 John Nesky, distributed under the MIT license.

/// <reference path="../synth/synth.ts" />
/// <reference path="ColorConfig.ts" />
/// <reference path="SongDocument.ts" />
/// <reference path="html.ts" />
/// <reference path="SongEditor.ts" />

namespace beepbox {
	
	interface PatternCopy {
		instrument: number;
		notes: any[];
	}
	
	interface ChannelCopy {
		isNoise: boolean;
		patterns: Dictionary<PatternCopy>;
		bars: number[];
	}
	
	interface SelectionCopy {
		beatsPerBar: number;
		channels: ChannelCopy[];
	}
	
	class Box {
		private readonly _text: Text = document.createTextNode("1");
		private readonly _label: SVGTextElement = SVG.text({"font-family": "sans-serif", "font-size": 20, "text-anchor": "middle", "font-weight": "bold", fill: "red"}, this._text);
		private readonly _rect: SVGRectElement = SVG.rect({x: 1, y: 1});
		public readonly container: SVGSVGElement = SVG.svg(this._rect, this._label);
		private _renderedIndex: number = 1;
		private _renderedDim: boolean = true;
		private _renderedSelected: boolean = false;
		private _renderedColor: string = "";
		constructor(channel: number, private readonly _x: number, private readonly _y: number, color: string) {
			this._rect.setAttribute("fill", ColorConfig.uiWidgetBackground);
			this._label.setAttribute("fill", color);
		}
		
		public setSize(width: number, height: number): void {
			this.container.setAttribute("x", "" + (this._x * width));
			this.container.setAttribute("y", "" + (this._y * height));
			this._rect.setAttribute("width", "" + (width - 2));
			this._rect.setAttribute("height", "" + (height - 2));
			this._label.setAttribute("x", "" + (width / 2));
			this._label.setAttribute("y", "" + Math.round(height / 2 + 7));
		}
		
		public setIndex(index: number, dim: boolean, selected: boolean, color: string): void {
			if (this._renderedIndex != index) {
				if (!this._renderedSelected && ((index == 0) != (this._renderedIndex == 0))) {
					this._rect.setAttribute("fill", (index == 0) ? "none" : ColorConfig.uiWidgetBackground);
				}
			
				this._renderedIndex = index;
				this._text.data = ""+index;
			}
			
			if (this._renderedDim != dim || this._renderedColor != color) {
				this._renderedDim = dim;
				if (selected) {
					this._label.setAttribute("fill", ColorConfig.invertedText);
				} else {
					this._label.setAttribute("fill", color);
				}
			}
			
			if (this._renderedSelected != selected || this._renderedColor != color) {
				this._renderedSelected = selected;
				if (selected) {
					this._rect.setAttribute("fill", color);
					this._label.setAttribute("fill", ColorConfig.invertedText);
				} else {
					this._rect.setAttribute("fill", (this._renderedIndex == 0) ? ColorConfig.editorBackground : ColorConfig.uiWidgetBackground);
					this._label.setAttribute("fill", color);
				}
			}
			
			this._renderedColor = color;
		}
	}
	
	export class TrackEditor {
		private readonly _boxContainer: SVGGElement = SVG.g();
		private readonly _playhead: SVGRectElement = SVG.rect({fill: ColorConfig.playhead, x: 0, y: 0, width: 4, height: 128});
		private readonly _boxHighlight: SVGRectElement = SVG.rect({fill: "none", stroke: ColorConfig.hoverPreview, "stroke-width": 2, "pointer-events": "none", x: 1, y: 1, width: 30, height: 30});
		private readonly _upHighlight: SVGPathElement = SVG.path({fill: ColorConfig.invertedText, stroke: ColorConfig.invertedText, "stroke-width": 1, "pointer-events": "none"});
		private readonly _downHighlight: SVGPathElement = SVG.path({fill: ColorConfig.invertedText, stroke: ColorConfig.invertedText, "stroke-width": 1, "pointer-events": "none"});
		private readonly _selectionRect: SVGRectElement = SVG.rect({fill: ColorConfig.boxSelectionFill, stroke: ColorConfig.hoverPreview, "stroke-width": 2, "stroke-dasharray": "5, 3", "pointer-events": "none", visibility: "hidden", x: 1, y: 1, width: 62, height: 62});
		private readonly _svg: SVGSVGElement = SVG.svg({style: `background-color: ${ColorConfig.editorBackground}; position: absolute;`, height: 128},
			this._boxContainer,
			this._selectionRect,
			this._boxHighlight,
			this._upHighlight,
			this._downHighlight,
			this._playhead,
		);
		private readonly _select: HTMLSelectElement = HTML.select({className: "trackSelectBox", style: "background: none; border: none; appearance: none; border-radius: initial; box-shadow: none; color: transparent; position: absolute; touch-action: none;"});
		public readonly container: HTMLElement = HTML.div({class: "noSelection", style: "height: 128px; position: relative; overflow:hidden;"}, this._svg, this._select);
		
		
		private readonly _grid: Box[][] = [];
		private _mouseX: number = 0;
		private _mouseY: number = 0;
		private _mouseStartBar: number = 0;
		private _mouseStartChannel: number = 0;
		private _mouseBar: number = 0;
		private _mouseChannel: number = 0;
		private _mouseOver: boolean = false;
		private _mousePressed: boolean = false;
		private _mouseDragging = false;
		private _digits: string = "";
		private _barWidth: number = 32;
		private _channelHeight: number = 32;
		private _boxSelectionX0: number = 0;
		private _boxSelectionY0: number = 0;
		private _boxSelectionX1: number = 0;
		private _boxSelectionY1: number = 0;
		private _renderedChannelCount: number = 0;
		private _renderedBarCount: number = 0;
		private _renderedPatternCount: number = 0;
		private _renderedPlayhead: number = -1;
		private _renderedBarWidth: number = -1;
		private _renderedChannelHeight: number = -1;
		private _touchMode: boolean = isMobile;
		private _changeTranspose: ChangeGroup | null = null;
		
		constructor(private _doc: SongDocument) {
			window.requestAnimationFrame(this._animatePlayhead);
			this._svg.addEventListener("mousedown", this._whenMousePressed);
			document.addEventListener("mousemove", this._whenMouseMoved);
			document.addEventListener("mouseup", this._whenMouseReleased);
			this._svg.addEventListener("mouseover", this._whenMouseOver);
			this._svg.addEventListener("mouseout", this._whenMouseOut);
			
			this._select.addEventListener("change", this._whenSelectChanged);
			this._select.addEventListener("touchstart", this._whenSelectPressed);
			this._select.addEventListener("touchmove", this._whenSelectMoved);
			this._select.addEventListener("touchend", this._whenSelectReleased);
			this._select.addEventListener("touchcancel", this._whenSelectReleased);
			
			let determinedCursorType: boolean = false;
			document.addEventListener("mousedown", () => {
				if (!determinedCursorType) {
					this._touchMode = false;
					this._updatePreview();
				}
				determinedCursorType = true;
			}, true);
			document.addEventListener("touchstart", () => {
				if (!determinedCursorType) {
					this._touchMode = true;
					this._updatePreview();
				}
				determinedCursorType = true;
			}, true);
		}
		
		private _whenSelectChanged = (): void => {
			this._setPattern(this._select.selectedIndex);
		}
		
		private _animatePlayhead = (timestamp: number): void => {
			const playhead = (this._barWidth * this._doc.synth.playhead - 2);
			if (this._renderedPlayhead != playhead) {
				this._renderedPlayhead = playhead;
				this._playhead.setAttribute("x", "" + playhead);
			}
			window.requestAnimationFrame(this._animatePlayhead);
		}
		
		private _selectionUpdated(): void {
			this._doc.notifier.changed();
			this._digits = "";
			this._doc.forgetLastChange();
		}
		
		private get _boxSelectionBar(): number {
			return Math.min(this._boxSelectionX0, this._boxSelectionX1);
		}
		private get _boxSelectionChannel(): number {
			return Math.min(this._boxSelectionY0, this._boxSelectionY1);
		}
		private get _boxSelectionWidth(): number {
			return Math.abs(this._boxSelectionX0 - this._boxSelectionX1) + 1;
		}
		private get _boxSelectionHeight(): number {
			return Math.abs(this._boxSelectionY0 - this._boxSelectionY1) + 1;
		}
		private _scrollToSelection(): void {
			this._doc.barScrollPos = Math.min(this._doc.barScrollPos, this._boxSelectionX1);
			this._doc.barScrollPos = Math.max(this._doc.barScrollPos, this._boxSelectionX1 - (this._doc.trackVisibleBars - 1));
		}
		
		private _setChannelBar(channel: number, bar: number): void {
			new ChangeChannelBar(this._doc, channel, bar);
			this._selectionUpdated();
		}
		
		private _setPattern(pattern: number): void {
			this._doc.record(new ChangePatternNumbers(this._doc, pattern, this._boxSelectionBar, this._boxSelectionChannel, this._boxSelectionWidth, this._boxSelectionHeight));
		}
		
		public onKeyPressed(event: KeyboardEvent): void {
			switch (event.keyCode) {
				case 38: // up
					if (event.shiftKey) {
						this._boxSelectionY1 = Math.max(0, this._boxSelectionY1 - 1);
						this._selectionUpdated();
					} else {
						this._setChannelBar((this._doc.channel - 1 + this._doc.song.getChannelCount()) % this._doc.song.getChannelCount(), this._doc.bar);
						this._resetBoxSelection();
					}
					event.preventDefault();
					break;
				case 40: // down
					if (event.shiftKey) {
						this._boxSelectionY1 = Math.min(this._doc.song.getChannelCount() - 1, this._boxSelectionY1 + 1);
						this._selectionUpdated();
					} else {
						this._setChannelBar((this._doc.channel + 1) % this._doc.song.getChannelCount(), this._doc.bar);
						this._resetBoxSelection();
					}
					event.preventDefault();
					break;
				case 37: // left
					if (event.shiftKey) {
						this._boxSelectionX1 = Math.max(0, this._boxSelectionX1 - 1);
						this._scrollToSelection();
						this._selectionUpdated();
					} else {
						this._setChannelBar(this._doc.channel, (this._doc.bar + this._doc.song.barCount - 1) % this._doc.song.barCount);
						this._resetBoxSelection();
					}
					event.preventDefault();
					break;
				case 39: // right
					if (event.shiftKey) {
						this._boxSelectionX1 = Math.min(this._doc.song.barCount - 1, this._boxSelectionX1 + 1);
						this._scrollToSelection();
						this._selectionUpdated();
					} else {
						this._setChannelBar(this._doc.channel, (this._doc.bar + 1) % this._doc.song.barCount);
						this._resetBoxSelection();
					}
					event.preventDefault();
					break;
				case 48: // 0
					this._nextDigit("0");
					event.preventDefault();
					break;
				case 49: // 1
					this._nextDigit("1");
					event.preventDefault();
					break;
				case 50: // 2
					this._nextDigit("2");
					event.preventDefault();
					break;
				case 51: // 3
					this._nextDigit("3");
					event.preventDefault();
					break;
				case 52: // 4
					this._nextDigit("4");
					event.preventDefault();
					break;
				case 53: // 5
					this._nextDigit("5");
					event.preventDefault();
					break;
				case 54: // 6
					this._nextDigit("6");
					event.preventDefault();
					break;
				case 55: // 7
					this._nextDigit("7");
					event.preventDefault();
					break;
				case 56: // 8
					this._nextDigit("8");
					event.preventDefault();
					break;
				case 57: // 9
					this._nextDigit("9");
					event.preventDefault();
					break;
				default:
					this._digits = "";
					break;
			}
		}
		
		public insertBars(): void {
			this._doc.record(new ChangeInsertBars(this._doc, this._boxSelectionBar + this._boxSelectionWidth, this._boxSelectionWidth), StateChangeType.jump);
			const width: number = this._boxSelectionWidth;
			this._boxSelectionX0 += width;
			this._boxSelectionX1 += width;
		}
		
		public deleteBars(): void {
			this._doc.record(new ChangeDeleteBars(this._doc, this._boxSelectionBar, this._boxSelectionWidth), StateChangeType.jump);
			const width: number = this._boxSelectionWidth;
			this._boxSelectionX0 = Math.max(0, this._boxSelectionX0 - width);
			this._boxSelectionX1 = Math.max(0, this._boxSelectionX1 - width);
		}
		
		private *_eachSelectedChannel(): IterableIterator<number> {
			for (let channel: number = this._boxSelectionChannel; channel < this._boxSelectionChannel + this._boxSelectionHeight; channel++) {
				yield channel;
			}
		}
		
		private *_eachSelectedBar(): IterableIterator<number> {
			for (let bar: number = this._boxSelectionBar; bar < this._boxSelectionBar + this._boxSelectionWidth; bar++) {
				yield bar;
			}
		}
		
		private *_eachUnselectedBar(): IterableIterator<number> {
			for (let bar: number = 0; bar < this._doc.song.barCount; bar++) {
				if (bar < this._boxSelectionBar || bar >= this._boxSelectionBar + this._boxSelectionWidth) {
					yield bar;
				}
			}
		}
		
		private *_eachSelectedPattern(channel: number): IterableIterator<Pattern> {
			const handledPatterns: Dictionary<boolean> = {};
			for (const bar of this._eachSelectedBar()) {
				const currentPatternIndex: number = this._doc.song.channels[channel].bars[bar];
				if (currentPatternIndex == 0) continue;
				if (handledPatterns[String(currentPatternIndex)]) continue;
				handledPatterns[String(currentPatternIndex)] = true;
				const pattern: Pattern | null = this._doc.song.getPattern(channel, bar);
				if (pattern == null) throw new Error();
				yield pattern;
			}
		}
		
		private _patternIndexIsUnused(channel: number, patternIndex: number): boolean {
			for (let i: number = 0; i < this._doc.song.barCount; i++) {
				if (this._doc.song.channels[channel].bars[i] == patternIndex) {
					return false;
				}
			}
			return true;
		}
		
		public copy(): void {
			const channels: ChannelCopy[] = [];
			
			for (const channel of this._eachSelectedChannel()) {
				const patterns: Dictionary<PatternCopy> = {};
				const bars: number[] = [];
				
				for (const bar of this._eachSelectedBar()) {
					const patternNumber: number = this._doc.song.channels[channel].bars[bar];
					bars.push(patternNumber);
					if (patterns[String(patternNumber)] == undefined) {
						const pattern: Pattern | null = this._doc.song.getPattern(channel, bar);
						let instrument: number = 0;
						let notes: Note[] = [];
						if (pattern != null) {
							instrument = pattern.instrument;
							notes = pattern.notes;
						}
						patterns[String(patternNumber)] = {"instrument": instrument, "notes": notes};
					}
				}
				
				const channelCopy: ChannelCopy = {
					"isNoise": this._doc.song.getChannelIsNoise(channel),
					"patterns": patterns,
					"bars": bars,
				};
				channels.push(channelCopy);
			}
			
			const selectionCopy: SelectionCopy = {
				"beatsPerBar": this._doc.song.beatsPerBar,
				"channels": channels,
			};
			window.localStorage.setItem("selectionCopy", JSON.stringify(selectionCopy));
		}
		
		// I'm sorry this function is so complicated!
		// Basically I'm trying to avoid accidentally modifying patterns that are used
		// elsewhere in the song (unless we're just pasting a single pattern) but I'm
		// also trying to reuse patterns where it makes sense to do so, especially 
		// in the same channel it was copied from.
		public pasteNotes(): void {
			const selectionCopy: SelectionCopy | null = JSON.parse(String(window.localStorage.getItem("selectionCopy")));
			if (selectionCopy == null) return;
			const channelCopies: ChannelCopy[] = selectionCopy["channels"] || [];
			const beatsPerBar: number = selectionCopy["beatsPerBar"] >>> 0;
			
			const group: ChangeGroup = new ChangeGroup();
			const fillSelection: boolean = (this._boxSelectionWidth > 1 || this._boxSelectionHeight > 1);
			
			const pasteHeight: number = fillSelection ? this._boxSelectionHeight : Math.min(channelCopies.length, this._doc.song.getChannelCount() - this._boxSelectionChannel);
			for (let pasteChannel: number = 0; pasteChannel < pasteHeight; pasteChannel++) {
				const channelCopy: ChannelCopy = channelCopies[pasteChannel % channelCopies.length];
				const channel: number = this._boxSelectionChannel + pasteChannel;
				
				const isNoise: boolean = !!channelCopy["isNoise"];
				const patternCopies: Dictionary<PatternCopy> = channelCopy["patterns"] || {};
				const copiedBars: number[] = channelCopy["bars"] || [];
				if (copiedBars.length == 0) continue;
				if (isNoise != this._doc.song.getChannelIsNoise(channel)) continue;
				
				const pasteWidth: number = fillSelection ? this._boxSelectionWidth : Math.min(copiedBars.length, this._doc.song.barCount - this._boxSelectionBar);
				if (!fillSelection && copiedBars.length == 1 && channelCopies.length == 1) {
					// Special case: if there's just one pattern being copied, try to insert it
					// into whatever pattern is already selected.
					const copiedPatternIndex: number = copiedBars[0] >>> 0;
					const bar: number = this._boxSelectionBar;
					const currentPatternIndex: number = this._doc.song.channels[channel].bars[bar];
					if (copiedPatternIndex == 0 && currentPatternIndex == 0) continue;
					
					const patternCopy: PatternCopy = patternCopies[String(copiedPatternIndex)];
					const instrumentCopy: number = Math.min(patternCopy["instrument"] >>> 0, this._doc.song.instrumentsPerChannel - 1);
					
					if (currentPatternIndex == 0) {
						const existingPattern: Pattern | undefined = this._doc.song.channels[channel].patterns[copiedPatternIndex - 1];
						if (existingPattern != undefined &&
							((comparePatternNotes(patternCopy["notes"], existingPattern.notes) && instrumentCopy == existingPattern.instrument) ||
							this._patternIndexIsUnused(channel, copiedPatternIndex)))
						{
							group.append(new ChangePatternNumbers(this._doc, copiedPatternIndex, bar, channel, 1, 1));
						} else {
							group.append(new ChangeEnsurePatternExists(this._doc, channel, bar));
						}
					}
					
					const pattern: Pattern | null = this._doc.song.getPattern(channel, bar);
					if (pattern == null) throw new Error();
					group.append(new ChangePaste(this._doc, pattern, patternCopy["notes"], beatsPerBar));
					group.append(new ChangePatternInstrument(this._doc, instrumentCopy, pattern));
				} else {
					for (let pasteBar: number = 0; pasteBar < pasteWidth; pasteBar++) {
						const bar: number = this._boxSelectionBar + pasteBar;
						const removedPattern: number = this._doc.song.channels[channel].bars[bar];
						if (removedPattern != 0) {
							group.append(new ChangePatternNumbers(this._doc, 0, bar, channel, 1, 1));
							if (this._patternIndexIsUnused(channel, removedPattern)) {
								// When a pattern becomes unused when replaced by rectangular selection pasting,
								// remove all the notes from the pattern so that it may be reused.
								this._doc.song.channels[channel].patterns[removedPattern - 1].notes.length = 0;
							}
						}
					}
					
					const reusablePatterns: Dictionary<number> = {};
					for (let pasteBar: number = 0; pasteBar < pasteWidth; pasteBar++) {
						const copiedPatternIndex: number = copiedBars[pasteBar % copiedBars.length] >>> 0;
						if (copiedPatternIndex == 0) continue;
						
						const bar: number = this._boxSelectionBar + pasteBar;
						if (reusablePatterns[String(copiedPatternIndex)] != undefined) {
							group.append(new ChangePatternNumbers(this._doc, reusablePatterns[String(copiedPatternIndex)], bar, channel, 1, 1));
						} else {
							const patternCopy: PatternCopy = patternCopies[String(copiedPatternIndex)];
							const instrumentCopy: number = Math.min(patternCopy["instrument"] >>> 0, this._doc.song.instrumentsPerChannel - 1);
							const existingPattern: Pattern | undefined = this._doc.song.channels[channel].patterns[copiedPatternIndex - 1];
							
							if (existingPattern != undefined &&
								comparePatternNotes(patternCopy["notes"], existingPattern.notes) &&
								instrumentCopy == existingPattern.instrument)
							{
								group.append(new ChangePatternNumbers(this._doc, copiedPatternIndex, bar, channel, 1, 1));
							} else {
								if (existingPattern != undefined && this._patternIndexIsUnused(channel, copiedPatternIndex)) {
									group.append(new ChangePatternNumbers(this._doc, copiedPatternIndex, bar, channel, 1, 1));
								} else {
									group.append(new ChangeEnsurePatternExists(this._doc, channel, bar));
								}
								const pattern: Pattern | null = this._doc.song.getPattern(channel, bar);
								if (pattern == null) throw new Error();
								group.append(new ChangePaste(this._doc, pattern, patternCopy["notes"], beatsPerBar));
								group.append(new ChangePatternInstrument(this._doc, instrumentCopy, pattern));
							}
							
							reusablePatterns[String(copiedPatternIndex)] = this._doc.song.channels[channel].bars[bar];
						}
					}
				}
			}
			
			this._doc.record(group);
		}
		
		public pasteNumbers(): void {
			const selectionCopy: SelectionCopy | null = JSON.parse(String(window.localStorage.getItem("selectionCopy")));
			if (selectionCopy == null) return;
			const channelCopies: ChannelCopy[] = selectionCopy["channels"] || [];
			
			const group: ChangeGroup = new ChangeGroup();
			const fillSelection: boolean = (this._boxSelectionWidth > 1 || this._boxSelectionHeight > 1);
			
			const pasteHeight: number = fillSelection ? this._boxSelectionHeight : Math.min(channelCopies.length, this._doc.song.getChannelCount() - this._boxSelectionChannel);
			for (let pasteChannel: number = 0; pasteChannel < pasteHeight; pasteChannel++) {
				const channelCopy: ChannelCopy = channelCopies[pasteChannel % channelCopies.length];
				const channel: number = this._boxSelectionChannel + pasteChannel;
				
				const copiedBars: number[] = channelCopy["bars"] || [];
				if (copiedBars.length == 0) continue;
				
				const pasteWidth: number = fillSelection ? this._boxSelectionWidth : Math.min(copiedBars.length, this._doc.song.barCount - this._boxSelectionBar);
				for (let pasteBar: number = 0; pasteBar < pasteWidth; pasteBar++) {
					const copiedPatternIndex: number = copiedBars[pasteBar % copiedBars.length] >>> 0;
					const bar: number = this._boxSelectionBar + pasteBar;
					
					if (copiedPatternIndex > this._doc.song.patternsPerChannel) {
						group.append(new ChangePatternsPerChannel(this._doc, copiedPatternIndex));
					}
					
					group.append(new ChangePatternNumbers(this._doc, copiedPatternIndex, bar, channel, 1, 1));
				}
			}
			
			this._doc.record(group);
		}
		
		public selectAll(): void {
			if (
				this._boxSelectionBar == 0 &&
				this._boxSelectionChannel == 0 &&
				this._boxSelectionWidth == this._doc.song.barCount &&
				this._boxSelectionHeight == this._doc.song.getChannelCount()
			) {
				this._resetBoxSelection();
			} else {
				this._boxSelectionX0 = 0;
				this._boxSelectionY0 = 0;
				this._boxSelectionX1 = this._doc.song.barCount - 1;
				this._boxSelectionY1 = this._doc.song.getChannelCount() - 1;
			}
			this._selectionUpdated();
		}
		
		public selectChannel(): void {
			if (
				this._boxSelectionBar == 0 &&
				this._boxSelectionWidth == this._doc.song.barCount
			) {
				this._boxSelectionX0 = this._boxSelectionX1 = this._doc.bar;
			} else {
				this._boxSelectionX0 = 0;
				this._boxSelectionX1 = this._doc.song.barCount - 1;
			}
			this._selectionUpdated();
		}
		
		public duplicatePatterns(): void {
			const group: ChangeGroup = new ChangeGroup();
			
			for (const channel of this._eachSelectedChannel()) {
				const reusablePatterns: Dictionary<number> = {};
				
				for (const bar of this._eachSelectedBar()) {
					const currentPatternIndex: number = this._doc.song.channels[channel].bars[bar];
					if (currentPatternIndex == 0) continue;
					
					if (reusablePatterns[String(currentPatternIndex)] == undefined) {
						let isUsedElsewhere = false;
						for (const bar2 of this._eachUnselectedBar()) {
							if (this._doc.song.channels[channel].bars[bar2] == currentPatternIndex) {
								isUsedElsewhere = true;
								break;
							}
						}
						if (isUsedElsewhere) {
							// Need to duplicate the pattern.
							const copiedPattern: Pattern = this._doc.song.getPattern(channel, bar)!;
							group.append(new ChangePatternNumbers(this._doc, 0, bar, channel, 1, 1));
							group.append(new ChangeEnsurePatternExists(this._doc, channel, bar));
							const newPattern: Pattern | null = this._doc.song.getPattern(channel, bar);
							if (newPattern == null) throw new Error();
							group.append(new ChangePaste(this._doc, newPattern, copiedPattern.notes, this._doc.song.beatsPerBar));
							group.append(new ChangePatternInstrument(this._doc, copiedPattern.instrument, newPattern));
							reusablePatterns[String(currentPatternIndex)] = this._doc.song.channels[channel].bars[bar];
						} else {
							reusablePatterns[String(currentPatternIndex)] = currentPatternIndex;
						}
					}
					
					group.append(new ChangePatternNumbers(this._doc, reusablePatterns[String(currentPatternIndex)], bar, channel, 1, 1));
				}
			}
			
			this._doc.record(group);
		}
		
		public muteChannels(allChannels: boolean): void {
			if (allChannels) {
				let anyMuted: boolean = false;
				for (let channel: number = 0; channel < this._doc.song.channels.length; channel++) {
					if (this._doc.song.channels[channel].muted) {
						anyMuted = true;
						break;
					}
				}
				for (let channel: number = 0; channel < this._doc.song.channels.length; channel++) {
					this._doc.song.channels[channel].muted = !anyMuted;
				}
			} else {
				let anyUnmuted: boolean = false;
				for (const channel of this._eachSelectedChannel()) {
					if (!this._doc.song.channels[channel].muted) {
						anyUnmuted = true;
						break;
					}
				}
				for (const channel of this._eachSelectedChannel()) {
					this._doc.song.channels[channel].muted = anyUnmuted;
				}
			}
			
			this._doc.notifier.changed();
		}
		
		public soloChannels(): void {
			let alreadySoloed: boolean = true;
			
			for (let channel: number = 0; channel < this._doc.song.channels.length; channel++) {
				const shouldBeMuted: boolean = channel < this._boxSelectionChannel || channel >= this._boxSelectionChannel + this._boxSelectionHeight;
				if (this._doc.song.channels[channel].muted != shouldBeMuted) {
					alreadySoloed = false;
					break;
				}
			}
			
			if (alreadySoloed) {
				for (let channel: number = 0; channel < this._doc.song.channels.length; channel++) {
					this._doc.song.channels[channel].muted = false;
				}
			} else {
				for (let channel: number = 0; channel < this._doc.song.channels.length; channel++) {
					this._doc.song.channels[channel].muted = channel < this._boxSelectionChannel || channel >= this._boxSelectionChannel + this._boxSelectionHeight;
				}
			}
			
			this._doc.notifier.changed();
		}
		
		public forceRhythm(): void {
			const group: ChangeGroup = new ChangeGroup();
			
			for (const channel of this._eachSelectedChannel()) {
				for (const pattern of this._eachSelectedPattern(channel)) {
					group.append(new ChangePatternRhythm(this._doc, pattern));
				}
			}
			
			this._doc.record(group);
		}
		
		public forceScale(): void {
			const group: ChangeGroup = new ChangeGroup();
			
			const scaleFlags: boolean[] = [true, false, false, false, false, false, false, false, false, false, false, false];
			for (const channel of this._eachSelectedChannel()) {
				if (this._doc.song.getChannelIsNoise(channel)) continue;
				for (const pattern of this._eachSelectedPattern(channel)) {
					unionOfUsedNotes(pattern, scaleFlags);
				}
			}
				
			const scaleMap: number[] = generateScaleMap(scaleFlags, this._doc.song.scale);
				
			for (const channel of this._eachSelectedChannel()) {
				if (this._doc.song.getChannelIsNoise(channel)) continue;
				for (const pattern of this._eachSelectedPattern(channel)) {
					group.append(new ChangePatternScale(this._doc, pattern, scaleMap));
				}
			}
			
			this._doc.record(group);
		}
		
		public transpose(upward: boolean, octave: boolean): void {
			const canReplaceLastChange: boolean = this._doc.lastChangeWas(this._changeTranspose);
			const group: ChangeGroup = new ChangeGroup();
			this._changeTranspose = group;
			
			for (const channel of this._eachSelectedChannel()) {
				for (const pattern of this._eachSelectedPattern(channel)) {
					group.append(new ChangeTranspose(this._doc, channel, pattern, upward, false, octave));
				}
			}
			
			this._doc.record(group, canReplaceLastChange ? StateChangeType.replace : StateChangeType.push);
		}
		
		public setInstrument(instrument: number): void {
			const group: ChangeGroup = new ChangeGroup();
			
			for (const channel of this._eachSelectedChannel()) {
				for (const pattern of this._eachSelectedPattern(channel)) {
					group.append(new ChangePatternInstrument(this._doc, instrument, pattern));
				}
			}
			
			this._doc.record(group);
		}
		
		private _nextDigit(digit: string): void {
			this._digits += digit;
			let parsed: number = parseInt(this._digits);
			if (parsed <= this._doc.song.patternsPerChannel) {
				this._setPattern(parsed);
				return;
			}
				
			this._digits = digit;
			parsed = parseInt(this._digits);
			if (parsed <= this._doc.song.patternsPerChannel) {
				this._setPattern(parsed);
				return;
			}
			
			this._digits = "";
		}
		
		private _resetBoxSelection(): void {
			this._boxSelectionX0 = this._boxSelectionX1 = this._doc.bar;
			this._boxSelectionY0 = this._boxSelectionY1 = this._doc.channel;
		}
		
		private _dragBoxSelection(): void {
			this._boxSelectionX1 = this._mouseBar;
			this._boxSelectionY1 = this._mouseChannel;
			this._selectionUpdated();
		}
		
		private _updateSelectPos(event: TouchEvent): void {
			const boundingRect: ClientRect = this._svg.getBoundingClientRect();
    		this._mouseX = event.touches[0].clientX - boundingRect.left;
		    this._mouseY = event.touches[0].clientY - boundingRect.top;
		    if (isNaN(this._mouseX)) this._mouseX = 0;
		    if (isNaN(this._mouseY)) this._mouseY = 0;
			this._mouseBar = Math.floor(Math.min(this._doc.song.barCount - 1, Math.max(0, this._mouseX / this._barWidth)));
			this._mouseChannel = Math.floor(Math.min(this._doc.song.getChannelCount() - 1, Math.max(0, this._mouseY / this._channelHeight)));
		}
		
		private _whenSelectPressed = (event: TouchEvent): void => {
			this._mousePressed = true;
			this._mouseDragging = true;
			this._updateSelectPos(event);
			this._mouseStartBar = this._mouseBar;
			this._mouseStartChannel = this._mouseChannel;
		}
		
		private _whenSelectMoved = (event: TouchEvent): void => {
			this._updateSelectPos(event);
			if (this._mouseStartBar != this._mouseBar || this._mouseStartChannel != this._mouseChannel) {
				// if the touch has started dragging, cancel opening the select menu.
				event.preventDefault();
			}
			if (this._mousePressed) this._dragBoxSelection();
			this._updatePreview();
		}
		
		private _whenSelectReleased = (event: TouchEvent): void => {
			this._mousePressed = false;
			this._mouseDragging = false;
			this._updatePreview();
		}
		
		private _whenMouseOver = (event: MouseEvent): void => {
			if (this._mouseOver) return;
			this._mouseOver = true;
		}
		
		private _whenMouseOut = (event: MouseEvent): void => {
			if (!this._mouseOver) return;
			this._mouseOver = false;
		}
		
		private _updateMousePos(event: MouseEvent): void {
			const boundingRect: ClientRect = this._svg.getBoundingClientRect();
    		this._mouseX = (event.clientX || event.pageX) - boundingRect.left;
		    this._mouseY = (event.clientY || event.pageY) - boundingRect.top;
			this._mouseBar = Math.floor(Math.min(this._doc.song.barCount - 1, Math.max(0, this._mouseX / this._barWidth)));
			this._mouseChannel = Math.floor(Math.min(this._doc.song.getChannelCount() - 1, Math.max(0, this._mouseY / this._channelHeight)));
		}
		
		private _whenMousePressed = (event: MouseEvent): void => {
			event.preventDefault();
			this._mousePressed = true;
			this._updateMousePos(event);
			this._mouseStartBar = this._mouseBar;
			this._mouseStartChannel = this._mouseChannel;
			if (event.shiftKey) {
				this._mouseDragging = true;
				this._boxSelectionX1 = this._mouseBar;
				this._boxSelectionY1 = this._mouseChannel;
				this._selectionUpdated();
			} else {
				this._mouseDragging = false;
				if (this._doc.channel != this._mouseChannel || this._doc.bar != this._mouseBar) {
					this._setChannelBar(this._mouseChannel, this._mouseBar);
					this._mouseDragging = true;
				}
				this._resetBoxSelection();
			}
		}
		
		private _whenMouseMoved = (event: MouseEvent): void => {
			this._updateMousePos(event);
			if (this._mousePressed) {
				if (this._mouseStartBar != this._mouseBar || this._mouseStartChannel != this._mouseChannel) {
					this._mouseDragging = true;
				}
				this._dragBoxSelection();
			}
			this._updatePreview();
		}
		
		private _whenMouseReleased = (event: MouseEvent): void => {
			if (this._mousePressed && !this._mouseDragging) {
				if (this._doc.channel == this._mouseChannel && this._doc.bar == this._mouseBar) {
					const up: boolean = (this._mouseY % this._channelHeight) < this._channelHeight / 2;
					const patternCount: number = this._doc.song.patternsPerChannel;
					this._setPattern((this._doc.song.channels[this._mouseChannel].bars[this._mouseBar] + (up ? 1 : patternCount)) % (patternCount + 1));
				}
			}
			this._mousePressed = false;
			this._mouseDragging = false;
			this._updatePreview();
		}
		
		private _updatePreview(): void {
			let channel: number = this._mouseChannel;
			let bar: number = this._mouseBar;
			
			if (this._touchMode) {
				bar = this._doc.bar;
				channel = this._doc.channel;
			}
			
			const selected: boolean = (bar == this._doc.bar && channel == this._doc.channel);
			
			if (this._mouseOver && !this._mousePressed && !selected) {
				this._boxHighlight.setAttribute("x", "" + (1 + this._barWidth * bar));
				this._boxHighlight.setAttribute("y", "" + (1 + (this._channelHeight * channel)));
				this._boxHighlight.setAttribute("height", "" + (this._channelHeight - 2));
				this._boxHighlight.setAttribute("width", "" + (this._barWidth - 2));
				this._boxHighlight.style.visibility = "visible";
			} else {
				this._boxHighlight.style.visibility = "hidden";
			}
			
			if ((this._mouseOver || this._touchMode) && selected) {
				const up: boolean = (this._mouseY % this._channelHeight) < this._channelHeight / 2;
				const center: number = this._barWidth * (bar + 0.8);
				const middle: number = this._channelHeight * (channel + 0.5);
				const base: number = this._channelHeight * 0.1;
				const tip: number = this._channelHeight * 0.4;
				const width: number = this._channelHeight * 0.175;
				
				this._upHighlight.setAttribute("fill", up && !this._touchMode ? ColorConfig.hoverPreview : ColorConfig.invertedText);
				this._downHighlight.setAttribute("fill", !up && !this._touchMode ? ColorConfig.hoverPreview : ColorConfig.invertedText);
				
				this._upHighlight.setAttribute("d", `M ${center} ${middle - tip} L ${center + width} ${middle - base} L ${center - width} ${middle - base} z`);
				this._downHighlight.setAttribute("d", `M ${center} ${middle + tip} L ${center + width} ${middle + base} L ${center - width} ${middle + base} z`);
				
				this._upHighlight.style.visibility = "visible";
				this._downHighlight.style.visibility = "visible";
			} else {
				this._upHighlight.style.visibility = "hidden";
				this._downHighlight.style.visibility = "hidden";
			}
			
			this._select.style.left = (this._barWidth * this._doc.bar) + "px";
			this._select.style.width = this._barWidth + "px";
			this._select.style.top = (this._channelHeight * this._doc.channel) + "px";
			this._select.style.height = this._channelHeight + "px";
			
			const patternCount: number = this._doc.song.patternsPerChannel + 1;
			for (let i: number = this._renderedPatternCount; i < patternCount; i++) {
				this._select.appendChild(HTML.option({value: i}, i));
			}
			for (let i: number = patternCount; i < this._renderedPatternCount; i++) {
				this._select.removeChild(<Node> this._select.lastChild);
			}
			this._renderedPatternCount = patternCount;
			const selectedPattern: number = this._doc.song.channels[this._doc.channel].bars[this._doc.bar];
			if (this._select.selectedIndex != selectedPattern) this._select.selectedIndex = selectedPattern;
		}
		
		public render(): void {
			this._barWidth = this._doc.getBarWidth();
			this._channelHeight = this._doc.getChannelHeight();
			
			if (this._renderedChannelCount != this._doc.song.getChannelCount()) {
				for (let y: number = this._renderedChannelCount; y < this._doc.song.getChannelCount(); y++) {
					this._grid[y] = [];
					for (let x: number = 0; x < this._renderedBarCount; x++) {
						const box: Box = new Box(y, x, y, ColorConfig.getChannelColor(this._doc.song, y).secondaryChannel);
						box.setSize(this._barWidth, this._channelHeight);
						this._boxContainer.appendChild(box.container);
						this._grid[y][x] = box;
					}
				}
				
				for (let y: number = this._doc.song.getChannelCount(); y < this._renderedChannelCount; y++) {
					for (let x: number = 0; x < this._renderedBarCount; x++) {
						this._boxContainer.removeChild(this._grid[y][x].container);
					}
				}
				
				this._grid.length = this._doc.song.getChannelCount();
				this._mousePressed = false;
			}
			
			if (this._renderedBarCount != this._doc.song.barCount) {
				for (let y: number = 0; y < this._doc.song.getChannelCount(); y++) {
					for (let x: number = this._renderedBarCount; x < this._doc.song.barCount; x++) {
						const box: Box = new Box(y, x, y, ColorConfig.getChannelColor(this._doc.song, y).secondaryChannel);
						box.setSize(this._barWidth, this._channelHeight);
						this._boxContainer.appendChild(box.container);
						this._grid[y][x] = box;
					}
					for (let x: number = this._doc.song.barCount; x < this._renderedBarCount; x++) {
						this._boxContainer.removeChild(this._grid[y][x].container);
					}
					this._grid[y].length = this._doc.song.barCount;
				}
			}
			
			if (this._renderedBarCount != this._doc.song.barCount || this._renderedBarWidth != this._barWidth) {
				this._renderedBarCount = this._doc.song.barCount;
				const editorWidth = this._barWidth * this._doc.song.barCount;
				this.container.style.width = editorWidth + "px";
				this._svg.setAttribute("width", editorWidth + "");
				this._mousePressed = false;
			}
			
			if (this._renderedChannelHeight != this._channelHeight || this._renderedBarWidth != this._barWidth) {
				this._renderedBarWidth = this._barWidth;
				for (let y: number = 0; y < this._doc.song.getChannelCount(); y++) {
					for (let x: number = 0; x < this._renderedBarCount; x++) {
						this._grid[y][x].setSize(this._barWidth, this._channelHeight);
					}
				}
				this._mousePressed = false;
			}
			
			if (this._renderedChannelHeight != this._channelHeight || this._renderedChannelCount != this._doc.song.getChannelCount()) {
				this._renderedChannelHeight = this._channelHeight;
				this._renderedChannelCount = this._doc.song.getChannelCount();
				const editorHeight: number = this._doc.song.getChannelCount() * this._channelHeight;
				this._svg.setAttribute("height", "" + editorHeight);
				this._playhead.setAttribute("height", "" + editorHeight);
				this.container.style.height = editorHeight + "px";
			}
			
			for (let j: number = 0; j < this._doc.song.getChannelCount(); j++) {
				for (let i: number = 0; i < this._renderedBarCount; i++) {
					const pattern: Pattern | null = this._doc.song.getPattern(j, i);
					const selected: boolean = (i == this._doc.bar && j == this._doc.channel);
					const dim: boolean = (pattern == null || pattern.notes.length == 0);
					
					const box: Box = this._grid[j][i];
					if (i < this._doc.song.barCount) {
						const colors: ChannelColors = ColorConfig.getChannelColor(this._doc.song, j);
						box.setIndex(this._doc.song.channels[j].bars[i], dim, selected, dim && !selected ? colors.secondaryChannel : colors.primaryChannel);
						box.container.style.visibility = "visible";
					} else {
						box.container.style.visibility = "hidden";
					}
				}
			}
			
			this._select.style.display = this._touchMode ? "" : "none";
			
			// I'm allowing the doc.bar to drift outside the box selection while playing
			// because it may auto-follow the playhead outside the selection but it would
			// be annoying to lose your selection just because the song is playing.
			if ((!this._doc.synth.playing && (this._doc.bar < this._boxSelectionBar || this._boxSelectionBar + this._boxSelectionWidth <= this._doc.bar)) ||
				this._doc.channel < this._boxSelectionChannel ||
				this._boxSelectionChannel + this._boxSelectionHeight <= this._doc.channel ||
				this._doc.song.barCount < this._boxSelectionBar + this._boxSelectionWidth ||
				this._doc.song.getChannelCount() < this._boxSelectionChannel + this._boxSelectionHeight ||
				(this._boxSelectionWidth == 1 && this._boxSelectionHeight == 1))
			{
				this._resetBoxSelection();
			}
			
			if (this._boxSelectionWidth > 1 || this._boxSelectionHeight > 1) {
				// TODO: This causes the selection rectangle to repaint every time the
				// editor renders and the selection is visible. Check if anything changed
				// before overwriting the attributes?
				this._selectionRect.setAttribute("x", String(this._barWidth * this._boxSelectionBar + 1));
				this._selectionRect.setAttribute("y", String(this._channelHeight * this._boxSelectionChannel + 1));
				this._selectionRect.setAttribute("width", String(this._barWidth * this._boxSelectionWidth - 2));
				this._selectionRect.setAttribute("height", String(this._channelHeight * this._boxSelectionHeight - 2));
				this._selectionRect.setAttribute("visibility", "visible");
			} else {
				this._selectionRect.setAttribute("visibility", "hidden");
			}
			
			this._updatePreview();
		}
	}
}
