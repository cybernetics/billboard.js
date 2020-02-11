/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {document, window} from "../../module/browser";

export default {
	initClip() {
		const $$ = this;
		const clip = $$.state.clip;

		// MEMO: clipId needs to be unique because it conflicts when multiple charts exist
		clip.id = `${$$.state.datetimeId}-clip`;
		clip.idXAxis = `${clip.id}-xaxis`;
		clip.idYAxis = `${clip.id}-yaxis`;
		clip.idGrid = `${clip.id}-grid`;

		// Define 'clip-path' attribute values
		clip.path = $$.getClipPath(clip.id);
		clip.pathXAxis = $$.getClipPath(clip.idXAxis);
		clip.pathYAxis = $$.getClipPath(clip.idYAxis);
		clip.pathGrid = $$.getClipPath(clip.idGrid);
	},

	getClipPath(id) {
		const $$ = this;
		const {config} = $$;

		if ((!config.clipPath && /-clip$/.test(id)) ||
			(!config.axis_x_clipPath && /-clip-xaxis$/.test(id)) ||
			(!config.axis_y_clipPath && /-clip-yaxis$/.test(id))) {
			return null;
		}

		const isIE9 = window.navigator ?
			window.navigator.appVersion
				.toLowerCase().indexOf("msie 9.") >= 0 : false;

		return `url(${(isIE9 ? "" : document.URL.split("#")[0])}#${id})`;
	},

	appendClip(parent, id) {
		return parent.append("clipPath")
			.attr("id", id)
			.append("rect");
	},

	getAxisClipX(forHorizontal) {
		const {margin} = this.state;
		// axis line width + padding for left
		const left = Math.max(30, margin.left);

		return forHorizontal ? -(1 + left) : -(left - 1);
	},

	getAxisClipY(forHorizontal) {
		const {margin} = this.state;

		return forHorizontal ? -20 : -margin.top;
	},

	getXAxisClipX() {
		const $$ = this;

		return $$.getAxisClipX(!$$.config.axis_rotated);
	},

	getXAxisClipY() {
		const $$ = this;

		return $$.getAxisClipY(!$$.config.axis_rotated);
	},

	getYAxisClipX() {
		const $$ = this;

		return $$.config.axis_y_inner ?
			-1 : $$.getAxisClipX($$.config.axis_rotated);
	},

	getYAxisClipY() {
		const $$ = this;

		return $$.getAxisClipY($$.config.axis_rotated);
	},

	getAxisClipWidth(forHorizontal) {
		const $$ = this;
		const {margin, width} = $$.state;
		const left = Math.max(30, margin.left);
		const right = Math.max(30, margin.right);

		// width + axis line width + padding for left/right
		return forHorizontal ?
			width + 2 + left + right : margin.left + 20;
	},

	getAxisClipHeight(forHorizontal) {
		const {margin, height} = this.state;
		// less than 20 is not enough to show the axis label 'outer' without legend
		return (forHorizontal ? margin.bottom : (margin.top + height)) + 20;
	},

	getXAxisClipWidth() {
		const $$ = this;

		return $$.getAxisClipWidth(!$$.config.axis_rotated);
	},

	getXAxisClipHeight() {
		const $$ = this;

		return $$.getAxisClipHeight(!$$.config.axis_rotated);
	},

	getYAxisClipWidth() {
		const $$ = this;

		return $$.getAxisClipWidth($$.config.axis_rotated) + ($$.config.axis_y_inner ? 20 : 0);
	},

	getYAxisClipHeight() {
		const $$ = this;

		return $$.getAxisClipHeight($$.config.axis_rotated);
	}
};