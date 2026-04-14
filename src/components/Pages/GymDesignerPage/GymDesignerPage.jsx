import React, { useState, useRef, useCallback, useEffect } from "react";
import HeaderBar from "../../HeaderBar/HeaderBar";
import Footer from "../../Footer/Footer";

// ─── COLORS ──────────────────────────────────────────────────────────────────

const PAINT_SWATCHES = [
	"#FFFFFF",
	"#F5D800",
	"#F5A020",
	"#E05000",
	"#CC1020",
	"#C8A878",
	"#7A4A28",
	"#111111",
	"#8B1A8B",
	"#7A1A28",
	"#1A7A30",
	"#0E5A1E",
	"#40C0E0",
	"#1050D0",
	"#0A2080",
	"#9A8050",
	"#888888",
];

const WOOD_SWATCHES = [
	"#C8A060",
	"#C8A020",
	"#7A5820",
	"#C0B080",
	"#888888",
	"#90B890",
	"#D09090",
	"#50A0A0",
	"#C8A040",
	"#A880C0",
	"#D07070",
	"#E0D8B0",
];

const LINE_SWATCHES = [
	"#FFFFFF",
	"#F5D800",
	"#F5A020",
	"#E05000",
	"#CC1020",
	"#C8A878",
	"#7A4A28",
	"#111111",
	"#8B1A8B",
	"#7A1A28",
	"#1A7A30",
	"#0E5A1E",
	"#40C0E0",
	"#1050D0",
	"#0A2080",
	"#9A8050",
	"#888888",
];

// ─── SVG COURT COMPONENTS ────────────────────────────────────────────────────

function WoodPattern({ id, hex, x = 0, y = 0 }) {
	const g1 = hex + "dd";
	return (
		<defs>
			<pattern
				id={id}
				patternUnits="userSpaceOnUse"
				width="5"
				height="50"
				x={x}
				y={y}
			>
				<rect width="5" height="50" fill={hex} />
				<rect x="0.8" width="1.0" height="50" fill="rgba(255,255,255,0.08)" />
				<rect x="2.8" width="0.5" height="50" fill="rgba(0,0,0,0.07)" />
				<rect x="4.2" width="0.4" height="50" fill="rgba(255,255,255,0.04)" />
			</pattern>
		</defs>
	);
}

function BasketballCourtLines({
	x,
	y,
	w,
	h,
	lc,
	kc,
	kac,
	tpc,
	ic,
	showKey,
	showKeyArch,
	showThree,
	showCenter,
}) {
	// ─── COORDINATE SYSTEM ───────────────────────────────────────────────────
	// Court runs LEFT-RIGHT (x-axis = 84ft long dimension)
	// Court runs TOP-BOTTOM (y-axis = 50ft wide dimension)
	// px(ft) = feet along LONG axis  →  SVG pixels horizontally
	// py(ft) = feet along SHORT axis →  SVG pixels vertically
	const px = (ft) => (ft / 84) * w;
	const py = (ft) => (ft / 50) * h;

	const midX = x + w / 2;
	const midY = y + h / 2;

	// ─── KEY BOX ─────────────────────────────────────────────────────────────
	// 12ft wide (across court = y direction) × 19ft deep (along court = x direction)
	const keyH = py(12); // 12ft in Y = height in SVG
	const keyD = px(19); // 19ft in X = depth (width in SVG from baseline)
	const keyTop = midY - keyH / 2;
	const keyBot = midY + keyH / 2;

	// Left key x coords
	const lK_base = x; // at left baseline
	const lK_ft = x + keyD; // at free throw line

	// Right key x coords
	const rK_base = x + w; // at right baseline
	const rK_ft = x + w - keyD; // at free throw line

	// ─── FREE THROW ARC ──────────────────────────────────────────────────────
	// Semicircle radius 6ft, centered on free throw line at midY
	// The arc is drawn as a vertical semicircle: endpoints are (ftX, keyTop) and (ftX, keyBot)
	// Solid half bulges INTO the court (away from baseline)
	// Dashed half bulges toward the baseline (inside the key — shown as dashed)
	const ftR = py(6);

	// ─── BASKET ──────────────────────────────────────────────────────────────
	const lBX = x + px(5.25);
	const rBX = x + w - px(5.25);

	// ─── 3-POINT ARC ─────────────────────────────────────────────────────────
	// Radius 23.75ft from basket. Elliptical in SVG since court is scaled non-uniformly.
	// Corner lines: 3ft from top/bottom sideline, run ~14ft from baseline
	const tpRx = px(23.75);
	const tpRy = py(23.75);
	const c3top = y + py(3);
	const c3bot = y + h - py(3);
	const c3len = px(14);

	// ─── HASH MARKS ──────────────────────────────────────────────────────────
	// 3 pairs of tick marks on top and bottom edges of the key
	// Spaced along the key depth, sticking inward
	const hLen = py(1.8); // how far tick marks poke inward
	const hX = [px(3), px(7), px(12)]; // x offsets from baseline along key

	return (
		<g>
			{/* Court interior fill */}
			{ic && <rect x={x} y={y} width={w} height={h} fill={ic} opacity="0.65" />}

			{/* 3-point FILL */}
			{tpc && showThree && (
				<g opacity="0.8">
					<path
						d={[
							"M",
							x,
							c3top,
							"L",
							x + c3len,
							c3top,
							"A",
							tpRx,
							tpRy,
							"0 0 1",
							x + c3len,
							c3bot,
							"L",
							x,
							c3bot,
							"Z",
						].join(" ")}
						fill={tpc}
					/>
					<path
						d={[
							"M",
							x + w,
							c3top,
							"L",
							x + w - c3len,
							c3top,
							"A",
							tpRx,
							tpRy,
							"0 0 0",
							x + w - c3len,
							c3bot,
							"L",
							x + w,
							c3bot,
							"Z",
						].join(" ")}
						fill={tpc}
					/>
				</g>
			)}

			{/* Key FILL */}
			{kc && showKey && (
				<>
					<rect
						x={lK_base}
						y={keyTop}
						width={keyD}
						height={keyH}
						fill={kc}
						opacity="0.9"
					/>
					<rect
						x={rK_ft}
						y={keyTop}
						width={keyD}
						height={keyH}
						fill={kc}
						opacity="0.9"
					/>
				</>
			)}

			{/* Key ARCH fill — D-shape at free throw line bulging into court */}
			{kac && showKeyArch && (
				<>
					{/* Left: bulges right (toward mid-court) */}
					<path
						d={["M", lK_ft, keyTop, "A", ftR, ftR, "0 0 1", lK_ft, keyBot].join(
							" ",
						)}
						fill={kac}
						opacity="0.9"
					/>
					{/* Right: bulges left (toward mid-court) */}
					<path
						d={["M", rK_ft, keyTop, "A", ftR, ftR, "0 0 0", rK_ft, keyBot].join(
							" ",
						)}
						fill={kac}
						opacity="0.9"
					/>
				</>
			)}

			{/* ── ALL COURT LINES ── */}
			<g stroke={lc} strokeWidth="1.5" fill="none">
				{/* Outer boundary */}
				<rect x={x} y={y} width={w} height={h} />

				{/* Half-court line — always drawn as part of boundary */}
				<line x1={midX} y1={y} x2={midX} y2={y + h} />

				{/* Center circle */}
				{showCenter && <circle cx={midX} cy={midY} r={py(6)} />}

				{/* ══ LEFT END ══ */}

				{/* Left key box */}
				{showKey && (
					<>
						<rect x={lK_base} y={keyTop} width={keyD} height={keyH} />
						{/* Hash marks on top edge (poke downward) */}
						{hX.map((ox, i) => (
							<line
								key={"lht" + i}
								x1={lK_base + ox}
								y1={keyTop}
								x2={lK_base + ox}
								y2={keyTop + hLen}
								strokeWidth="1.2"
							/>
						))}
						{/* Hash marks on bottom edge (poke upward) */}
						{hX.map((ox, i) => (
							<line
								key={"lhb" + i}
								x1={lK_base + ox}
								y1={keyBot}
								x2={lK_base + ox}
								y2={keyBot - hLen}
								strokeWidth="1.2"
							/>
						))}
					</>
				)}

				{/* Left free throw arc */}
				{showKeyArch && (
					<>
						{/* Solid half — bulges right into court */}
						<path
							d={[
								"M",
								lK_ft,
								keyTop,
								"A",
								ftR,
								ftR,
								"0 0 1",
								lK_ft,
								keyBot,
							].join(" ")}
						/>
						{/* Dashed half — bulges left toward baseline */}
						<path
							d={[
								"M",
								lK_ft,
								keyTop,
								"A",
								ftR,
								ftR,
								"0 0 0",
								lK_ft,
								keyBot,
							].join(" ")}
							strokeDasharray="5 4"
						/>
					</>
				)}

				{/* Left 3-point arc */}
				{showThree && (
					<>
						<line x1={x} y1={c3top} x2={x + c3len} y2={c3top} />
						<path
							d={[
								"M",
								x + c3len,
								c3top,
								"A",
								tpRx,
								tpRy,
								"0 0 1",
								x + c3len,
								c3bot,
							].join(" ")}
						/>
						<line x1={x + c3len} y1={c3bot} x2={x} y2={c3bot} />
					</>
				)}

				{/* ══ RIGHT END ══ */}

				{/* Right key box */}
				{showKey && (
					<>
						<rect x={rK_ft} y={keyTop} width={keyD} height={keyH} />
						{/* Hash marks on top edge */}
						{hX.map((ox, i) => (
							<line
								key={"rht" + i}
								x1={rK_base - ox}
								y1={keyTop}
								x2={rK_base - ox}
								y2={keyTop + hLen}
								strokeWidth="1.2"
							/>
						))}
						{/* Hash marks on bottom edge */}
						{hX.map((ox, i) => (
							<line
								key={"rhb" + i}
								x1={rK_base - ox}
								y1={keyBot}
								x2={rK_base - ox}
								y2={keyBot - hLen}
								strokeWidth="1.2"
							/>
						))}
					</>
				)}

				{/* Right free throw arc */}
				{showKeyArch && (
					<>
						{/* Solid half — bulges left into court */}
						<path
							d={[
								"M",
								rK_ft,
								keyTop,
								"A",
								ftR,
								ftR,
								"0 0 0",
								rK_ft,
								keyBot,
							].join(" ")}
						/>
						{/* Dashed half — bulges right toward baseline */}
						<path
							d={[
								"M",
								rK_ft,
								keyTop,
								"A",
								ftR,
								ftR,
								"0 0 1",
								rK_ft,
								keyBot,
							].join(" ")}
							strokeDasharray="5 4"
						/>
					</>
				)}

				{/* Right 3-point arc */}
				{showThree && (
					<>
						<line x1={x + w} y1={c3top} x2={x + w - c3len} y2={c3top} />
						<path
							d={[
								"M",
								x + w - c3len,
								c3top,
								"A",
								tpRx,
								tpRy,
								"0 0 0",
								x + w - c3len,
								c3bot,
							].join(" ")}
						/>
						<line x1={x + w - c3len} y1={c3bot} x2={x + w} y2={c3bot} />
					</>
				)}
			</g>
		</g>
	);
}

// Compact court for side courts — uses same geometry as BasketballCourtLines
function SmallCourt({ x, y, w, h, lc = "#111", elements }) {
	// Same coordinate system as main court:
	// px = horizontal (84ft long axis), py = vertical (50ft wide axis)
	const px = (ft) => (ft / 84) * w;
	const py = (ft) => (ft / 50) * h;
	const midX = x + w / 2;
	const midY = y + h / 2;
	const sw = Math.max(0.6, w / 180);

	// Key box: 12ft across (Y) × 19ft deep (X) — same as main court
	const keyH = py(12);
	const keyD = px(19);
	const keyTop = midY - keyH / 2;
	const keyBot = midY + keyH / 2;
	const lK_base = x,
		lK_ft = x + keyD;
	const rK_base = x + w,
		rK_ft = x + w - keyD;

	// Free throw arc radius
	const ftR = py(6);

	// 3-point arc
	const tpRx = px(23.75);
	const tpRy = py(23.75);
	const c3top = y + py(3);
	const c3bot = y + h - py(3);
	const c3len = px(14);

	// Hash marks
	const hLen = py(1.8);
	const hX = [px(3), px(7), px(12)];

	const showKey = !elements || elements.key !== false;
	const showArch = !elements || elements.keyArch !== false;
	const showThree = !elements || elements.threePoint !== false;
	const showCenter = !elements || elements.centerCircle !== false;

	return (
		<g stroke={lc} strokeWidth={sw} fill="none">
			{/* Outer boundary */}
			<rect x={x} y={y} width={w} height={h} />

			{/* Half-court line */}
			<line x1={midX} y1={y} x2={midX} y2={y + h} />

			{/* Center circle */}
			{showCenter && <circle cx={midX} cy={midY} r={py(6)} />}

			{/* Left key box */}
			{showKey && (
				<>
					<rect x={lK_base} y={keyTop} width={keyD} height={keyH} />
					{hX.map((ox, i) => (
						<line
							key={"lht" + i}
							x1={lK_base + ox}
							y1={keyTop}
							x2={lK_base + ox}
							y2={keyTop + hLen}
							strokeWidth={sw * 0.8}
						/>
					))}
					{hX.map((ox, i) => (
						<line
							key={"lhb" + i}
							x1={lK_base + ox}
							y1={keyBot}
							x2={lK_base + ox}
							y2={keyBot - hLen}
							strokeWidth={sw * 0.8}
						/>
					))}
				</>
			)}

			{/* Left free throw arc */}
			{showArch && (
				<>
					<path
						d={["M", lK_ft, keyTop, "A", ftR, ftR, "0 0 1", lK_ft, keyBot].join(
							" ",
						)}
					/>
					<path
						d={["M", lK_ft, keyTop, "A", ftR, ftR, "0 0 0", lK_ft, keyBot].join(
							" ",
						)}
						strokeDasharray="4 3"
					/>
				</>
			)}

			{/* Left 3-point arc */}
			{showThree && (
				<>
					<line x1={x} y1={c3top} x2={x + c3len} y2={c3top} />
					<path
						d={[
							"M",
							x + c3len,
							c3top,
							"A",
							tpRx,
							tpRy,
							"0 0 1",
							x + c3len,
							c3bot,
						].join(" ")}
					/>
					<line x1={x + c3len} y1={c3bot} x2={x} y2={c3bot} />
				</>
			)}

			{/* Right key box */}
			{showKey && (
				<>
					<rect x={rK_ft} y={keyTop} width={keyD} height={keyH} />
					{hX.map((ox, i) => (
						<line
							key={"rht" + i}
							x1={rK_base - ox}
							y1={keyTop}
							x2={rK_base - ox}
							y2={keyTop + hLen}
							strokeWidth={sw * 0.8}
						/>
					))}
					{hX.map((ox, i) => (
						<line
							key={"rhb" + i}
							x1={rK_base - ox}
							y1={keyBot}
							x2={rK_base - ox}
							y2={keyBot - hLen}
							strokeWidth={sw * 0.8}
						/>
					))}
				</>
			)}

			{/* Right free throw arc */}
			{showArch && (
				<>
					<path
						d={["M", rK_ft, keyTop, "A", ftR, ftR, "0 0 0", rK_ft, keyBot].join(
							" ",
						)}
					/>
					<path
						d={["M", rK_ft, keyTop, "A", ftR, ftR, "0 0 1", rK_ft, keyBot].join(
							" ",
						)}
						strokeDasharray="4 3"
					/>
				</>
			)}

			{/* Right 3-point arc */}
			{showThree && (
				<>
					<line x1={x + w} y1={c3top} x2={x + w - c3len} y2={c3top} />
					<path
						d={[
							"M",
							x + w - c3len,
							c3top,
							"A",
							tpRx,
							tpRy,
							"0 0 0",
							x + w - c3len,
							c3bot,
						].join(" ")}
					/>
					<line x1={x + w - c3len} y1={c3bot} x2={x + w} y2={c3bot} />
				</>
			)}
		</g>
	);
}

function VolleyballLines({ x, y, w, h, lc }) {
	const px = (ft) => (ft / 60) * w;
	const sw = Math.max(0.8, w / 300);
	return (
		<g stroke={lc} strokeWidth={sw} fill="none">
			<rect x={x} y={y} width={w} height={h} />
			<line
				x1={x + w / 2}
				y1={y}
				x2={x + w / 2}
				y2={y + h}
				strokeWidth={sw * 1.5}
			/>
			<line
				x1={x + px(10)}
				y1={y}
				x2={x + px(10)}
				y2={y + h}
				strokeDasharray="5 3"
				strokeWidth={sw * 0.7}
			/>
			<line
				x1={x + w - px(10)}
				y1={y}
				x2={x + w - px(10)}
				y2={y + h}
				strokeDasharray="5 3"
				strokeWidth={sw * 0.7}
			/>
		</g>
	);
}

function BadmintonLines({ x, y, w, h, lc }) {
	const sw = Math.max(0.5, w / 300);
	return (
		<g stroke={lc} strokeWidth={sw} fill="none">
			<rect x={x} y={y} width={w} height={h} />
			<line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} />
			<line x1={x + w * 0.13} y1={y} x2={x + w * 0.13} y2={y + h} />
			<line x1={x + w - w * 0.13} y1={y} x2={x + w - w * 0.13} y2={y + h} />
			<line
				x1={x + w * 0.13}
				y1={y + h * 0.25}
				x2={x + w - w * 0.13}
				y2={y + h * 0.25}
			/>
			<line
				x1={x + w * 0.13}
				y1={y + h * 0.75}
				x2={x + w - w * 0.13}
				y2={y + h * 0.75}
			/>
			<line
				x1={x + w * 0.13}
				y1={y + h / 2}
				x2={x + w - w * 0.13}
				y2={y + h / 2}
			/>
		</g>
	);
}

function PickleballLines({ x, y, w, h, lc }) {
	const px = (ft) => (ft / 44) * w;
	const sw = Math.max(0.5, w / 300);
	return (
		<g stroke={lc} strokeWidth={sw} fill="none">
			<rect x={x} y={y} width={w} height={h} />
			<line
				x1={x + w / 2}
				y1={y}
				x2={x + w / 2}
				y2={y + h}
				strokeDasharray="4 3"
			/>
			<line x1={x + px(7)} y1={y} x2={x + px(7)} y2={y + h} />
			<line x1={x + w - px(7)} y1={y} x2={x + w - px(7)} y2={y + h} />
			<line x1={x + px(7)} y1={y + h / 2} x2={x + w - px(7)} y2={y + h / 2} />
		</g>
	);
}

// Draggable + flippable + rotatable court wrapper
function DraggableCourt({
	id,
	initX,
	initY,
	children,
	canvasW,
	canvasH,
	courtW,
	courtH,
}) {
	const [pos, setPos] = useState({ x: initX, y: initY });
	const [flipH, setFlipH] = useState(false); // mirror left↔right
	const [flipV, setFlipV] = useState(false); // mirror top↔bottom
	const [rotated, setRotated] = useState(false); // 90° rotation (portrait mode)
	const [hovered, setHovered] = useState(false);
	const dragging = useRef(false);
	const startMouse = useRef({ x: 0, y: 0 });
	const startPos = useRef({ x: initX, y: initY });

	const onMouseDown = (e) => {
		if (e.target.closest && e.target.closest("[data-flip-btn]")) return;
		dragging.current = true;
		startMouse.current = { x: e.clientX, y: e.clientY };
		startPos.current = { ...pos };
		e.preventDefault();
		e.stopPropagation();
	};

	useEffect(() => {
		const onMouseMove = (e) => {
			if (!dragging.current) return;
			const svgEl = document.querySelector('[data-court-canvas="true"]');
			if (!svgEl) return;
			const rect = svgEl.getBoundingClientRect();
			const scaleX = canvasW / rect.width;
			const scaleY = canvasH / rect.height;
			const dx = (e.clientX - startMouse.current.x) * scaleX;
			const dy = (e.clientY - startMouse.current.y) * scaleY;
			setPos({ x: startPos.current.x + dx, y: startPos.current.y + dy });
		};
		const onMouseUp = () => {
			dragging.current = false;
		};
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
	}, [canvasW, canvasH]);

	const cw = courtW || 0;
	const ch = courtH || 0;

	// Build the content transform:
	// 1. Rotate 90° if needed: rotate around origin, then translate to keep top-left anchored
	// 2. Apply H/V flips after rotation
	// After 90° CW rotation: point (x,y) → (h-y, x), so we need translate(ch, 0) rotate(90)
	// The rendered bounding box becomes ch wide × cw tall
	let contentTransform = "";
	if (rotated && !flipH && !flipV) {
		contentTransform = `translate(${ch},0) rotate(90)`;
	} else if (rotated && flipH && !flipV) {
		contentTransform = `translate(0,0) rotate(90) scale(-1,1) translate(${-cw},0)`;
	} else if (rotated && !flipH && flipV) {
		contentTransform = `translate(${ch},${cw}) rotate(90) scale(1,-1)`;
	} else if (rotated && flipH && flipV) {
		contentTransform = `translate(0,${cw}) rotate(90) scale(-1,-1) translate(${-cw},0)`;
	} else if (!rotated && flipH && !flipV) {
		contentTransform = `translate(${cw},0) scale(-1,1)`;
	} else if (!rotated && !flipH && flipV) {
		contentTransform = `translate(0,${ch}) scale(1,-1)`;
	} else if (!rotated && flipH && flipV) {
		contentTransform = `translate(${cw},${ch}) scale(-1,-1)`;
	} else {
		contentTransform = `translate(0,0)`;
	}

	// Button layout
	const btnH = Math.max(14, Math.min(20, cw * 0.032));
	const btnW = btnH * 2.4;
	const btnGap = 4;
	const btnY = -btnH - 5;

	const buttons = [
		{ label: "↺ 90°", active: rotated, onClick: () => setRotated((r) => !r) },
	];

	return (
		<g
			onMouseDown={onMouseDown}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{ cursor: "grab" }}
		>
			{/* Control buttons — always positioned relative to the untransformed court top-left */}
			<g transform={`translate(${pos.x},${pos.y})`}>
				{buttons.map((btn, i) => (
					<g
						key={btn.label}
						data-flip-btn="true"
						onClick={(e) => {
							e.stopPropagation();
							btn.onClick();
						}}
						style={{ cursor: "pointer" }}
					>
						<rect
							x={i * (btnW + btnGap)}
							y={btnY}
							width={btnW}
							height={btnH}
							rx={3}
							fill={btn.active ? "#1a73e8" : "#1a2540"}
							opacity={hovered ? 1 : 0.72}
						/>
						<text
							x={i * (btnW + btnGap) + btnW / 2}
							y={btnY + btnH / 2}
							textAnchor="middle"
							dominantBaseline="middle"
							fontSize={btnH * 0.54}
							fill="white"
							fontFamily="Arial"
							fontWeight="bold"
							style={{ pointerEvents: "none", userSelect: "none" }}
						>
							{btn.label}
						</text>
					</g>
				))}
			</g>

			{/* Court content */}
			<g transform={`translate(${pos.x},${pos.y})`}>
				<g transform={contentTransform}>{children}</g>
			</g>
		</g>
	);
}

// Main court preview SVG
function MainCourtSVG({ state, canvasW = 840, canvasH = 472 }) {
	const {
		roomW,
		roomH,
		gymW,
		gymH,
		woodHex,
		borderTBHex,
		borderLRHex,
		borderTBThick,
		borderLRThick,
		lineColor,
		courtInterior,
		keyColor,
		keyArchColor,
		threePointColor,
		centerLogo,
		logoSize,
		logoOpacity,
		textTop,
		textBottom,
		textLeft,
		textRight,
		textFont,
		textFontSizeTB,
		textFontSizeLR,
		showKey,
		showKeyArch,
		showThree,
		showCenter,
		gridlines,
		sideCourts,
	} = state;

	// ── SCALE: everything uses ONE fixed px-per-foot ratio ──────────────────
	const DEFAULT_ROOM = 100; // ft — the baseline room size
	const pxPerFt = Math.min(canvasW, canvasH) / DEFAULT_ROOM;

	// Border thickness in SVG pixels — input 0-200 treated as inches → convert to feet → to pixels
	const bTB = borderTBHex ? Math.max(2, (borderTBThick / 12) * pxPerFt) : 0;
	const bLR = borderLRHex ? Math.max(2, (borderLRThick / 12) * pxPerFt) : 0;

	// Court size in SVG pixels — ALWAYS FIXED based on actual court dimensions
	const courtFtW = gymW || 84;
	const courtFtH = gymH || 50;
	const mainCW = courtFtW * pxPerFt;
	const mainCH = courtFtH * pxPerFt;

	// Room size in SVG pixels — grows/shrinks based on roomW/roomH
	const rW = roomW || DEFAULT_ROOM;
	const rH = roomH || DEFAULT_ROOM;
	const bgW = rW * pxPerFt;
	const bgH = rH * pxPerFt;

	// Room centered in SVG canvas
	const bgX = (canvasW - bgW) / 2;
	const bgY = (canvasH - bgH) / 2;

	// Court centered inside the room
	const mainCX0 = bgX + (bgW - mainCW) / 2;
	const mainCY0 = bgY + (bgH - mainCH) / 2;

	// Side courts — same real dimensions as main court (84×50 ft), same pxPerFt scale
	// They stack to the left of the main court inside the room
	const hasSide = sideCourts.length > 0;
	const sideW = mainCW; // same width as main court
	const sideH = mainCH; // same height as main court

	const lc = lineColor || "#111111";

	// ViewBox needs to accommodate the room even when it's larger than canvasW/canvasH
	const vbPad = 60;
	const vbW = Math.max(canvasW, bgX + bgW + vbPad * 2, -bgX + bgW + vbPad);
	const vbH = Math.max(canvasH, bgY + bgH + vbPad * 2, -bgY + bgH + vbPad);
	const vbX = Math.min(0, bgX - vbPad);
	const vbY = Math.min(0, bgY - vbPad);

	return (
		<svg
			viewBox={vbX + " " + vbY + " " + vbW + " " + vbH}
			style={{ width: "100%", height: "100%", display: "block" }}
			data-court-canvas="true"
		>
			{/* SVG outer background (neutral color — shown when room is smaller than canvas) */}
			<rect x={vbX} y={vbY} width={vbW} height={vbH} fill="#CCBF9A" />

			{/* Room background — sized to roomW × roomH aspect ratio */}
			<WoodPattern id="canvas-bg" hex={woodHex || "#C8A060"} />
			<rect x={bgX} y={bgY} width={bgW} height={bgH} fill={"url(#canvas-bg)"} />

			{/* Side courts — draggable, same size as main court, stack below it */}
			{sideCourts.map((sc, i) => {
				const gap = 16;
				const initX = mainCX0; // same x as main court
				const initY = mainCY0 + mainCH + gap + i * (sideH + gap); // below main court
				const sid = "sc-wood-" + i;
				return (
					<DraggableCourt
						key={sc.id}
						id={sc.id}
						initX={initX}
						initY={initY}
						canvasW={canvasW}
						canvasH={canvasH}
						courtW={sideW}
						courtH={sideH}
					>
						<WoodPattern id={sid} hex={woodHex || "#C8A060"} />
						<rect
							x={0}
							y={0}
							width={sideW}
							height={sideH}
							fill={"url(#" + sid + ")"}
						/>
						<SmallCourt
							x={0}
							y={0}
							w={sideW}
							h={sideH}
							lc={sc.lineColor || "#111"}
							elements={sc.elements}
						/>
						<rect
							x={0}
							y={0}
							width={sideW}
							height={sideH}
							fill="transparent"
							style={{ cursor: "grab" }}
						/>
					</DraggableCourt>
				);
			})}

			{/* Main court — draggable */}
			{/* The group is offset so borders expand OUTWARD from the court.
		  Court lines always occupy the full mainCW × mainCH area.
		  Borders are drawn outside that area (negative offsets from group origin). */}
			<DraggableCourt
				id="main"
				initX={mainCX0}
				initY={mainCY0}
				canvasW={canvasW}
				canvasH={canvasH}
				courtW={mainCW}
				courtH={mainCH}
			>
				<WoodPattern id="wp-main" hex={woodHex || "#C8A060"} x={0} y={0} />
				{/* Border stripes — drawn OUTSIDE the court boundary */}
				{borderTBHex && (
					<rect
						x={-bLR}
						y={-bTB}
						width={mainCW + bLR * 2}
						height={bTB}
						fill={borderTBHex}
					/>
				)}
				{borderTBHex && (
					<rect
						x={-bLR}
						y={mainCH}
						width={mainCW + bLR * 2}
						height={bTB}
						fill={borderTBHex}
					/>
				)}
				{borderLRHex && (
					<rect
						x={-bLR}
						y={-bTB}
						width={bLR}
						height={mainCH + bTB * 2}
						fill={borderLRHex}
					/>
				)}
				{borderLRHex && (
					<rect
						x={mainCW}
						y={-bTB}
						width={bLR}
						height={mainCH + bTB * 2}
						fill={borderLRHex}
					/>
				)}
				{/* Wood floor — always full court size */}
				<rect
					x={0}
					y={0}
					width={mainCW}
					height={mainCH}
					fill={"url(#wp-main)"}
				/>
				{/* Gridlines */}
				{gridlines &&
					(() => {
						const gStep = Math.max(mainCW / 12, mainCH / 8);
						const els = [];
						for (let gx = 0; gx <= mainCW; gx += gStep)
							els.push(
								<line
									key={"gv" + gx}
									x1={gx}
									y1={0}
									x2={gx}
									y2={mainCH}
									stroke="rgba(160,120,60,0.2)"
									strokeWidth="0.5"
								/>,
							);
						for (let gy = 0; gy <= mainCH; gy += gStep)
							els.push(
								<line
									key={"gh" + gy}
									x1={0}
									y1={gy}
									x2={mainCW}
									y2={gy}
									stroke="rgba(160,120,60,0.2)"
									strokeWidth="0.5"
								/>,
							);
						return <g>{els}</g>;
					})()}
				{/* Court lines — always full court size, never affected by border thickness */}
				<BasketballCourtLines
					x={0}
					y={0}
					w={mainCW}
					h={mainCH}
					lc={lc}
					kc={keyColor}
					kac={keyArchColor}
					tpc={threePointColor}
					ic={courtInterior}
					showKey={showKey !== false}
					showKeyArch={showKeyArch !== false}
					showThree={showThree !== false}
					showCenter={showCenter !== false}
				/>
				{/* Logo */}
				{centerLogo &&
					(() => {
						const lw = (logoSize / 100) * mainCW * 0.45;
						const lh = (logoSize / 100) * mainCH * 0.65;
						return (
							<image
								href={centerLogo}
								x={mainCW / 2 - lw / 2}
								y={mainCH / 2 - lh / 2}
								width={lw}
								height={lh}
								opacity={logoOpacity / 100}
								preserveAspectRatio="xMidYMid meet"
							/>
						);
					})()}
				{/* Border text */}
				{borderTBHex && bTB > 0 && textTop && (
					<text
						x={mainCW / 2}
						y={-bTB / 2}
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize={Math.max(8, bTB * 0.44)}
						fontFamily={textFont || "Arial"}
						fontWeight="bold"
						fill="#FFFFFF"
						letterSpacing="3"
					>
						{textTop.toUpperCase()}
					</text>
				)}
				{borderTBHex && bTB > 0 && textBottom && (
					<text
						x={mainCW / 2}
						y={mainCH + bTB / 2}
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize={Math.max(8, bTB * 0.44)}
						fontFamily={textFont || "Arial"}
						fontWeight="bold"
						fill="#FFFFFF"
						letterSpacing="3"
					>
						{textBottom.toUpperCase()}
					</text>
				)}
				{borderLRHex && bLR > 0 && textLeft && (
					<text
						x={-bLR / 2}
						y={mainCH / 2}
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize={Math.max(7, bLR * 0.28)}
						fontFamily={textFont || "Arial"}
						fontWeight="bold"
						fill="#FFFFFF"
						transform={"rotate(-90 " + -bLR / 2 + " " + mainCH / 2 + ")"}
						letterSpacing="2"
					>
						{textLeft.toUpperCase()}
					</text>
				)}
				{borderLRHex && bLR > 0 && textRight && (
					<text
						x={mainCW + bLR / 2}
						y={mainCH / 2}
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize={Math.max(7, bLR * 0.28)}
						fontFamily={textFont || "Arial"}
						fontWeight="bold"
						fill="#FFFFFF"
						transform={
							"rotate(90 " + (mainCW + bLR / 2) + " " + mainCH / 2 + ")"
						}
						letterSpacing="2"
					>
						{textRight.toUpperCase()}
					</text>
				)}
				{/* Drag handle */}
				<rect
					x={-bLR}
					y={-bTB}
					width={mainCW + bLR * 2}
					height={mainCH + bTB * 2}
					fill="transparent"
					style={{ cursor: "grab" }}
				/>
			</DraggableCourt>

			{/* Room dimension watermark */}
			<text
				x={bgX + bgW / 2}
				y={bgY + bgH - 4}
				textAnchor="middle"
				fontSize="9"
				fill="rgba(100,70,30,0.35)"
				fontFamily="Arial"
			>
				{roomW || 100} ft × {roomH || 100} ft room
			</text>
		</svg>
	);
}

// ─── UI COMPONENTS ────────────────────────────────────────────────────────────

const NAV = { background: "#1a2540", color: "white" };
const BTN_DARK = {
	background: "#1a2540",
	color: "white",
	border: "none",
	padding: "6px 14px",
	fontSize: 12,
	cursor: "pointer",
	letterSpacing: "0.04em",
	fontFamily: "Arial, sans-serif",
	borderRadius: 3,
};
const BTN_BLUE = { ...BTN_DARK, background: "#1a73e8", fontWeight: 700 };
const BTN_GREEN = { ...BTN_DARK, background: "#16a34a", fontWeight: 700 };

function NavBar({
	step,
	totalSteps,
	stepTitle,
	onStartOver,
	onClear,
	onBack,
	onNext,
	isFinal,
}) {
	return (
		<div
			style={{
				...NAV,
				padding: "8px 16px",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<div style={{ display: "flex", gap: 6 }}>
				<button style={BTN_DARK} onClick={onStartOver}>
					START OVER
				</button>
				<button style={BTN_DARK} onClick={onClear}>
					CLEAR
				</button>
			</div>
			<span style={{ fontWeight: 600, fontSize: 13 }}>
				{stepTitle?.toUpperCase()}
			</span>
			<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
				<span style={{ fontSize: 11, color: "#94A3B8" }}>
					STEP {step}/{totalSteps}
				</span>
				<button
					style={{ ...BTN_DARK, opacity: step <= 1 ? 0.4 : 1 }}
					onClick={onBack}
					disabled={step <= 1}
				>
					{"< BACK"}
				</button>
				{isFinal ? (
					<button style={BTN_GREEN} onClick={onNext}>
						GET QUOTE
					</button>
				) : (
					<button style={BTN_BLUE} onClick={onNext}>
						NEXT {">"}
					</button>
				)}
			</div>
		</div>
	);
}

function CourtHeader({ title }) {
	return (
		<div
			style={{
				padding: "10px 16px 0",
				borderBottom: "1px solid #E0E0E0",
				background: "white",
			}}
		>
			<h1
				style={{
					margin: 0,
					fontSize: 20,
					fontWeight: 700,
					color: "#1a2540",
					paddingBottom: 10,
					fontFamily: "Arial, sans-serif",
				}}
			>
				{title}
			</h1>
		</div>
	);
}

function CourtControls({
	roomW,
	roomH,
	setRoomW,
	setRoomH,
	zoom,
	setZoom,
	gridlines,
	setGridlines,
}) {
	return (
		<div
			style={{
				background: "white",
				borderBottom: "1px solid #DDD",
				padding: "8px 14px",
				display: "flex",
				alignItems: "center",
				gap: 10,
				flexWrap: "wrap",
			}}
		>
			<div
				style={{ fontSize: 11, color: "#666", fontStyle: "italic", flex: 1 }}
			>
				SETS THE GYM ROOM CANVAS SIZE (WIDTH × LENGTH IN FEET)
			</div>
			<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						background: BTN_DARK.background,
						borderRadius: 3,
						overflow: "hidden",
					}}
				>
					<span
						style={{
							padding: "5px 10px",
							color: "white",
							fontSize: 11,
							fontWeight: 700,
							letterSpacing: "0.06em",
						}}
					>
						WIDTH <sup style={{ fontSize: 8 }}>FT</sup>
					</span>
					<input
						type="number"
						min={20}
						max={500}
						value={roomW}
						onChange={(e) => setRoomW(Number(e.target.value))}
						style={{
							width: 58,
							padding: "5px 6px",
							border: "none",
							borderLeft: "1px solid rgba(255,255,255,0.2)",
							fontSize: 13,
							background: "white",
							textAlign: "center",
						}}
					/>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<button
							onClick={() => setRoomW((w) => Math.min(500, w + 1))}
							style={{
								border: "none",
								background: "white",
								cursor: "pointer",
								fontSize: 9,
								padding: "1px 4px",
								lineHeight: 1,
							}}
						>
							▲
						</button>
						<button
							onClick={() => setRoomW((w) => Math.max(20, w - 1))}
							style={{
								border: "none",
								background: "white",
								cursor: "pointer",
								fontSize: 9,
								padding: "1px 4px",
								lineHeight: 1,
							}}
						>
							▼
						</button>
					</div>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						background: BTN_DARK.background,
						borderRadius: 3,
						overflow: "hidden",
					}}
				>
					<span
						style={{
							padding: "5px 10px",
							color: "white",
							fontSize: 11,
							fontWeight: 700,
							letterSpacing: "0.06em",
						}}
					>
						LENGTH <sup style={{ fontSize: 8 }}>FT</sup>
					</span>
					<input
						type="number"
						min={20}
						max={500}
						value={roomH}
						onChange={(e) => setRoomH(Number(e.target.value))}
						style={{
							width: 58,
							padding: "5px 6px",
							border: "none",
							borderLeft: "1px solid rgba(255,255,255,0.2)",
							fontSize: 13,
							background: "white",
							textAlign: "center",
						}}
					/>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<button
							onClick={() => setRoomH((h) => Math.min(500, h + 1))}
							style={{
								border: "none",
								background: "white",
								cursor: "pointer",
								fontSize: 9,
								padding: "1px 4px",
								lineHeight: 1,
							}}
						>
							▲
						</button>
						<button
							onClick={() => setRoomH((h) => Math.max(20, h - 1))}
							style={{
								border: "none",
								background: "white",
								cursor: "pointer",
								fontSize: 9,
								padding: "1px 4px",
								lineHeight: 1,
							}}
						>
							▼
						</button>
					</div>
				</div>
			</div>
			<div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
				<button
					style={BTN_DARK}
					onClick={() => setZoom((z) => Math.min(160, z + 15))}
				>
					+ ZOOM IN
				</button>
				<button
					style={BTN_DARK}
					onClick={() => setZoom((z) => Math.max(50, z - 15))}
				>
					- ZOOM OUT
				</button>
			</div>
		</div>
	);
}

function CourtCanvas({ children, zoom, setZoom }) {
	const containerRef = React.useRef(null);
	const [pan, setPan] = React.useState({ x: 0, y: 0 });
	const isPanning = React.useRef(false);
	const panStart = React.useRef({ mx: 0, my: 0, px: 0, py: 0 });

	// Mouse wheel → zoom
	React.useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const onWheel = (e) => {
			e.preventDefault();
			const delta = e.deltaY > 0 ? -10 : 10;
			setZoom((z) => Math.min(200, Math.max(40, z + delta)));
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => el.removeEventListener("wheel", onWheel);
	}, [setZoom]);

	// Ctrl + drag → pan
	React.useEffect(() => {
		const onMouseDown = (e) => {
			if (!e.ctrlKey && !e.metaKey) return;
			isPanning.current = true;
			panStart.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y };
			e.preventDefault();
		};
		const onMouseMove = (e) => {
			if (!isPanning.current) return;
			const dx = e.clientX - panStart.current.mx;
			const dy = e.clientY - panStart.current.my;
			setPan({ x: panStart.current.px + dx, y: panStart.current.py + dy });
		};
		const onMouseUp = () => {
			isPanning.current = false;
		};
		const el = containerRef.current;
		if (!el) return;
		el.addEventListener("mousedown", onMouseDown);
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
		return () => {
			el.removeEventListener("mousedown", onMouseDown);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
	}, [pan]);

	return (
		<div
			ref={containerRef}
			style={{
				flex: 1,
				overflow: "hidden",
				background: "#D8D0C0",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				position: "relative",
				cursor: "default",
			}}
		>
			<div
				style={{
					width: zoom + "%",
					maxWidth: "none",
					aspectRatio: "16/9",
					boxShadow: "0 6px 30px rgba(0,0,0,0.3)",
					borderRadius: 2,
					overflow: "visible",
					flexShrink: 0,
					transform: "translate(" + pan.x + "px," + pan.y + "px)",
					transition: isPanning.current ? "none" : "transform 0.05s",
				}}
			>
				{children}
			</div>
		</div>
	);
}

function CourtBottom({ gridlines, setGridlines, onGetPdf }) {
	return (
		<div
			style={{
				background: "white",
				borderTop: "1px solid #DDD",
				padding: "8px 16px",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
				<span
					style={{
						fontSize: 12,
						fontWeight: 700,
						color: "#1a2540",
						marginRight: 4,
					}}
				>
					GRIDLINES
				</span>
				{["ON", "OFF"].map((v) => (
					<button
						key={v}
						onClick={() => setGridlines(v === "ON")}
						style={{
							padding: "4px 12px",
							fontSize: 11,
							fontWeight: 700,
							background:
								(gridlines ? "ON" : "OFF") === v ? "#1a2540" : "#E8E8E8",
							color: (gridlines ? "ON" : "OFF") === v ? "white" : "#555",
							border: "1px solid #CCC",
							borderRadius: 2,
							cursor: "pointer",
							fontFamily: "Arial",
						}}
					>
						{v}
					</button>
				))}
			</div>
			<span style={{ fontSize: 11, color: "#999" }}>
				Scroll to zoom · Hold Ctrl + drag to pan · Click & drag courts to move
			</span>
			<button
				style={{
					...BTN_DARK,
					padding: "8px 20px",
					fontSize: 13,
					fontWeight: 700,
				}}
				onClick={onGetPdf}
			>
				GET PDF
			</button>
		</div>
	);
}

// Accordion color row (click header to expand)
function ColorAccordion({
	label,
	value,
	onChange,
	swatches,
	defaultOpen = false,
}) {
	const [open, setOpen] = useState(defaultOpen);
	return (
		<div style={{ borderTop: "1px solid #E8E8E8" }}>
			<button
				onClick={() => setOpen((o) => !o)}
				style={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "10px 0",
					border: "none",
					background: "transparent",
					cursor: "pointer",
					textAlign: "left",
				}}
			>
				<span
					style={{
						fontSize: 12,
						fontWeight: 600,
						color: "#1a2540",
						letterSpacing: "0.03em",
					}}
				>
					{label}
				</span>
				<span style={{ fontSize: 11, color: "#999" }}>{open ? "▲" : "▼"}</span>
			</button>
			{open && (
				<div style={{ paddingBottom: 12 }}>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(4, 28px)",
							gap: 4,
						}}
					>
						{swatches.map((hex, i) => (
							<button
								key={i}
								onClick={() => {
									onChange(hex === value ? null : hex);
								}}
								style={{
									width: 28,
									height: 28,
									background: hex,
									border: "none",
									outline:
										value === hex
											? "3px solid #1a73e8"
											: "1.5px solid rgba(0,0,0,0.15)",
									outlineOffset: value === hex ? "1px" : "0",
									cursor: "pointer",
									borderRadius: 2,
									position: "relative",
								}}
							>
								{value === hex && (
									<span
										style={{
											position: "absolute",
											inset: 0,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											color:
												hex === "#FFFFFF" || hex === "#F5D800"
													? "#333"
													: "white",
											fontSize: 14,
											fontWeight: 700,
										}}
									>
										✓
									</span>
								)}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

function SidebarLabel({ children }) {
	return (
		<div
			style={{
				fontSize: 11,
				fontWeight: 700,
				color: "#1a2540",
				letterSpacing: "0.08em",
				textTransform: "uppercase",
				marginBottom: 6,
				marginTop: 10,
			}}
		>
			{children}
		</div>
	);
}

// ─── STEP PANELS ─────────────────────────────────────────────────────────────

function Step1Panel({ state, setState }) {
	const SIZES = [
		{ id: "hs", label: "HIGH SCHOOL STANDARD SIZE", w: 84, h: 50 },
		{ id: "uni", label: "UNIVERSITY STANDARD SIZE", w: 94, h: 50 },
		{ id: "custom", label: "CUSTOM SIZE", w: state.gymW, h: state.gymH },
		{ id: "none", label: "NO MAIN BASKETBALL COURT", w: 0, h: 0 },
	];
	const elements = [
		{ id: "key", stateKey: "showKey", label: "Key" },
		{ id: "keyArch", stateKey: "showKeyArch", label: "Key Arch" },
		{ id: "threePoint", stateKey: "showThree", label: "3 Point Arch" },
		{ id: "centerCircle", stateKey: "showCenter", label: "Center Circle" },
	];
	const [elemOpen, setElemOpen] = useState(true);

	return (
		<div>
			<div style={{ marginBottom: 16 }}>
				{SIZES.map((s) => (
					<label
						key={s.id}
						style={{
							display: "flex",
							alignItems: "center",
							gap: 10,
							padding: "9px 0",
							borderBottom: "1px solid #F0F0F0",
							cursor: "pointer",
						}}
					>
						<input
							type="radio"
							name="courtSize"
							checked={state.courtSizeId === s.id}
							onChange={() =>
								setState((p) => ({
									...p,
									courtSizeId: s.id,
									gymW: s.w || p.gymW,
									gymH: s.h || p.gymH,
								}))
							}
							style={{ accentColor: "#1a2540", width: 16, height: 16 }}
						/>
						<span style={{ fontSize: 12, fontWeight: 600, color: "#1a2540" }}>
							{s.label}
						</span>
					</label>
				))}
			</div>
			<button
				onClick={() => setElemOpen((o) => !o)}
				style={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "8px 0",
					border: "none",
					background: "transparent",
					cursor: "pointer",
					borderTop: "1px solid #DDD",
				}}
			>
				<span
					style={{
						fontSize: 11,
						fontWeight: 700,
						color: "#1a2540",
						letterSpacing: "0.08em",
					}}
				>
					SELECT COURT ELEMENTS APPLICABLE
				</span>
				<span style={{ fontSize: 11, color: "#999" }}>
					{elemOpen ? "▲" : "▼"}
				</span>
			</button>
			{elemOpen && (
				<div style={{ paddingTop: 8 }}>
					{elements.map((el) => {
						const key = el.stateKey;
						const on = state[key] !== false;
						return (
							<div key={el.id} style={{ marginBottom: 12 }}>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: 8,
										marginBottom: 4,
									}}
								>
									<button
										onClick={() => setState((p) => ({ ...p, [key]: !on }))}
										style={{
											background: "none",
											border: "none",
											cursor: "pointer",
											fontSize: 16,
											opacity: on ? 1 : 0.3,
											padding: 0,
										}}
									>
										👁
									</button>
									<span
										style={{ fontSize: 12, fontWeight: 600, color: "#1a2540" }}
									>
										{el.label}
									</span>
								</div>
								<div
									style={{
										width: 72,
										height: 52,
										border: "1px solid #DDD",
										borderRadius: 3,
										overflow: "hidden",
										background: "#F9F9F9",
										opacity: on ? 1 : 0.3,
									}}
								>
									<svg
										viewBox="0 0 72 52"
										style={{ width: "100%", height: "100%" }}
									>
										<rect x={0} y={0} width={72} height={52} fill="#F0E8D0" />
										{el.id === "key" && (
											<g stroke="#333" strokeWidth="1" fill="none">
												<rect x={2} y={14} width={16} height={24} />
												<line x1={2} y1={14} x2={2} y2={38} />
												<line x1={6} y1={16} x2={2} y2={16} strokeWidth="0.7" />
												<line x1={6} y1={22} x2={2} y2={22} strokeWidth="0.7" />
												<line x1={6} y1={30} x2={2} y2={30} strokeWidth="0.7" />
											</g>
										)}
										{el.id === "keyArch" && (
											<g stroke="#333" strokeWidth="1.5" fill="none">
												<path d={"M 2 26 A 10 10 0 0 0 22 26"} />
												<path
													d={"M 2 26 A 10 10 0 0 1 22 26"}
													strokeDasharray="3 2"
												/>
											</g>
										)}
										{el.id === "threePoint" && (
											<g stroke="#333" strokeWidth="1.2" fill="none">
												<line x1={2} y1={6} x2={14} y2={6} />
												<path d={"M 14 6 A 24 24 0 0 1 14 46"} />
												<line x1={14} y1={46} x2={2} y2={46} />
											</g>
										)}
										{el.id === "centerCircle" && (
											<g stroke="#333" strokeWidth="1.2" fill="none">
												<circle cx={36} cy={26} r={14} />
												<circle cx={36} cy={26} r={4} />
											</g>
										)}
									</svg>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

function Step2Panel({ state, setState, fileRef, handleLogo }) {
	const s = state;
	const set = (k, v) => setState((p) => ({ ...p, [k]: v }));
	const [fontOpen, setFontOpen] = useState(false);
	const [fontLROpen, setFontLROpen] = useState(false);
	const [logoOpen, setLogoOpen] = useState(false);

	return (
		<div style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
			{/* Border size */}
			<div style={{ marginBottom: 8 }}>
				<SidebarLabel>BORDER SIZE</SidebarLabel>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 8,
						marginBottom: 6,
					}}
				>
					<div
						style={{
							background: "#1a2540",
							color: "white",
							padding: "5px 8px",
							fontSize: 11,
							fontWeight: 700,
							borderRadius: 2,
							whiteSpace: "nowrap",
						}}
					>
						THICKNESS
						<br />
						<span style={{ fontSize: 9 }}>TB ™</span>
					</div>
					<input
						type="number"
						min={0}
						max={200}
						value={s.borderTBThick}
						onChange={(e) => set("borderTBThick", Number(e.target.value))}
						style={{
							flex: 1,
							padding: "6px 8px",
							border: "1px solid #D1D5DB",
							borderRadius: 3,
							fontSize: 13,
							textAlign: "center",
						}}
					/>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<button
							onClick={() =>
								set("borderTBThick", Math.min(200, s.borderTBThick + 1))
							}
							style={{
								border: "1px solid #D1D5DB",
								background: "white",
								cursor: "pointer",
								fontSize: 9,
								padding: "2px 5px",
								lineHeight: 1,
							}}
						>
							▲
						</button>
						<button
							onClick={() =>
								set("borderTBThick", Math.max(0, s.borderTBThick - 1))
							}
							style={{
								border: "1px solid #D1D5DB",
								borderTop: "none",
								background: "white",
								cursor: "pointer",
								fontSize: 9,
								padding: "2px 5px",
								lineHeight: 1,
							}}
						>
							▼
						</button>
					</div>
				</div>
				<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
					<div
						style={{
							background: "#1a2540",
							color: "white",
							padding: "5px 8px",
							fontSize: 11,
							fontWeight: 700,
							borderRadius: 2,
							whiteSpace: "nowrap",
						}}
					>
						THICKNESS
						<br />
						<span style={{ fontSize: 9 }}>LR ™</span>
					</div>
					<input
						type="number"
						min={0}
						max={200}
						value={s.borderLRThick}
						onChange={(e) => set("borderLRThick", Number(e.target.value))}
						style={{
							flex: 1,
							padding: "6px 8px",
							border: "1px solid #D1D5DB",
							borderRadius: 3,
							fontSize: 13,
							textAlign: "center",
						}}
					/>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<button
							onClick={() =>
								set("borderLRThick", Math.min(200, s.borderLRThick + 1))
							}
							style={{
								border: "1px solid #D1D5DB",
								background: "white",
								cursor: "pointer",
								fontSize: 9,
								padding: "2px 5px",
								lineHeight: 1,
							}}
						>
							▲
						</button>
						<button
							onClick={() =>
								set("borderLRThick", Math.max(0, s.borderLRThick - 1))
							}
							style={{
								border: "1px solid #D1D5DB",
								borderTop: "none",
								background: "white",
								cursor: "pointer",
								fontSize: 9,
								padding: "2px 5px",
								lineHeight: 1,
							}}
						>
							▼
						</button>
					</div>
				</div>
			</div>

			<ColorAccordion
				label="BORDER COLOR (TOP/BOTTOM)"
				value={s.borderTBHex}
				onChange={(v) => set("borderTBHex", v)}
				swatches={PAINT_SWATCHES}
			/>
			<ColorAccordion
				label="BORDER COLOR (LEFT/RIGHT)"
				value={s.borderLRHex}
				onChange={(v) => set("borderLRHex", v)}
				swatches={PAINT_SWATCHES}
			/>
			<ColorAccordion
				label="LINE COLOR"
				value={s.lineColor}
				onChange={(v) => set("lineColor", v || "#111111")}
				swatches={LINE_SWATCHES}
			/>
			<ColorAccordion
				label="COURT INTERIOR COLOR"
				value={s.courtInterior}
				onChange={(v) => set("courtInterior", v)}
				swatches={PAINT_SWATCHES}
			/>

			{/* Wood stain inline */}
			<div
				style={{
					borderTop: "1px solid #E8E8E8",
					paddingTop: 8,
					paddingBottom: 10,
				}}
			>
				<div
					style={{
						fontSize: 12,
						fontWeight: 600,
						color: "#1a2540",
						marginBottom: 8,
					}}
				>
					WOOD STAIN
				</div>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(4, 30px)",
						gap: 4,
					}}
				>
					{WOOD_SWATCHES.map((hex, i) => (
						<button
							key={i}
							onClick={() => set("woodHex", hex)}
							style={{
								width: 30,
								height: 30,
								background: hex,
								border: "none",
								outline:
									s.woodHex === hex
										? "3px solid #1a73e8"
										: "1.5px solid rgba(0,0,0,0.2)",
								outlineOffset: s.woodHex === hex ? "1px" : "0",
								cursor: "pointer",
								borderRadius: 2,
							}}
						>
							{s.woodHex === hex && (
								<span style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
									✓
								</span>
							)}
						</button>
					))}
				</div>
			</div>

			<ColorAccordion
				label="KEY COLOR"
				value={s.keyColor}
				onChange={(v) => set("keyColor", v)}
				swatches={PAINT_SWATCHES}
			/>
			<ColorAccordion
				label="KEY ARCH COLOR"
				value={s.keyArchColor}
				onChange={(v) => set("keyArchColor", v)}
				swatches={PAINT_SWATCHES}
			/>
			<ColorAccordion
				label="3 POINT FILL COLOR"
				value={s.threePointColor}
				onChange={(v) => set("threePointColor", v)}
				swatches={PAINT_SWATCHES}
			/>

			{/* Center court logo */}
			<div style={{ borderTop: "1px solid #E8E8E8", paddingTop: 10 }}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 6,
						marginBottom: 8,
					}}
				>
					<span style={{ fontSize: 16 }}>👁</span>
					<span style={{ fontSize: 12, fontWeight: 700, color: "#1a2540" }}>
						CENTER COURT LOGO
					</span>
				</div>
				<input
					ref={fileRef}
					type="file"
					accept="image/*"
					style={{ display: "none" }}
					onChange={handleLogo}
				/>
				{s.centerLogo && (
					<div style={{ marginBottom: 8, textAlign: "center" }}>
						<img
							src={s.centerLogo}
							alt="logo"
							style={{ maxHeight: 50, maxWidth: "100%", borderRadius: 3 }}
						/>
					</div>
				)}
				<button
					onClick={() => fileRef.current?.click()}
					style={{
						width: "100%",
						padding: "9px",
						border: "1px solid #DDD",
						background: "white",
						cursor: "pointer",
						fontSize: 12,
						fontWeight: 700,
						color: "#1a2540",
						marginBottom: 6,
						letterSpacing: "0.05em",
						fontFamily: "Arial",
					}}
				>
					{s.centerLogo
						? "UPLOAD CENTER COURT LOGO"
						: "UPLOAD CENTER COURT LOGO"}
				</button>
				<button
					style={{
						width: "100%",
						padding: "9px",
						background: "#1a2540",
						color: "white",
						border: "none",
						cursor: "pointer",
						fontSize: 12,
						fontWeight: 700,
						marginBottom: 8,
						letterSpacing: "0.05em",
						fontFamily: "Arial",
					}}
				>
					ADD ADDITIONAL LOGO
				</button>
				{s.centerLogo && (
					<div style={{ marginBottom: 8 }}>
						<div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>
							WIDTH (size %)
						</div>
						<input
							type="number"
							min={10}
							max={100}
							value={s.logoSize}
							onChange={(e) =>
								setState((p) => ({ ...p, logoSize: Number(e.target.value) }))
							}
							style={{
								width: 70,
								padding: "5px 8px",
								border: "1px solid #D1D5DB",
								borderRadius: 3,
								fontSize: 13,
							}}
						/>
						<button
							onClick={() => setState((p) => ({ ...p, centerLogo: null }))}
							style={{
								marginLeft: 8,
								background: "#EF4444",
								color: "white",
								border: "none",
								borderRadius: "50%",
								width: 22,
								height: 22,
								cursor: "pointer",
								fontSize: 12,
								fontWeight: 700,
							}}
						>
							×
						</button>
						<div
							style={{
								marginTop: 6,
								fontSize: 11,
								color: "#555",
								marginBottom: 4,
							}}
						>
							OPACITY %
						</div>
						<div style={{ display: "flex", gap: 6, alignItems: "center" }}>
							<input
								type="number"
								min={0}
								max={100}
								value={s.logoOpacity}
								onChange={(e) =>
									setState((p) => ({
										...p,
										logoOpacity: Number(e.target.value),
									}))
								}
								style={{
									width: 60,
									padding: "5px 8px",
									border: "1px solid #D1D5DB",
									borderRadius: 3,
									fontSize: 13,
								}}
							/>
							<input
								type="range"
								min={0}
								max={100}
								value={s.logoOpacity}
								onChange={(e) =>
									setState((p) => ({
										...p,
										logoOpacity: Number(e.target.value),
									}))
								}
								style={{ flex: 1, accentColor: "#1a2540" }}
							/>
						</div>
					</div>
				)}
			</div>

			{/* Font top/bottom */}
			<div style={{ borderTop: "1px solid #E8E8E8", paddingTop: 10 }}>
				<div
					style={{
						fontSize: 12,
						fontWeight: 700,
						color: "#1a2540",
						marginBottom: 8,
					}}
				>
					CHOOSE FONT FOR TOP/BOTTOM BORDER
				</div>
				<select
					value={s.textFont || "Arial"}
					onChange={(e) =>
						setState((p) => ({ ...p, textFont: e.target.value }))
					}
					style={{
						width: "100%",
						padding: "7px 8px",
						border: "1px solid #D1D5DB",
						borderRadius: 3,
						fontSize: 12,
						marginBottom: 8,
						fontFamily: "Arial",
					}}
				>
					{[
						"Arial",
						"Impact",
						"Georgia",
						"Trebuchet MS",
						"Times New Roman",
						"Courier New",
						"Verdana",
					].map((f) => (
						<option key={f}>{f}</option>
					))}
				</select>
				<input
					type="text"
					value={s.textTop || ""}
					placeholder="text1"
					onChange={(e) => setState((p) => ({ ...p, textTop: e.target.value }))}
					style={{
						width: "100%",
						padding: "7px 8px",
						border: "1px solid #D1D5DB",
						borderRadius: 3,
						fontSize: 12,
						marginBottom: 6,
						fontFamily: "Arial",
					}}
				/>
				<div
					style={{
						display: "flex",
						gap: 6,
						alignItems: "center",
						marginBottom: 6,
					}}
				>
					<div
						style={{
							background: "#1a2540",
							color: "white",
							padding: "5px 8px",
							fontSize: 11,
							fontWeight: 700,
							borderRadius: 2,
						}}
					>
						FONT SIZE
					</div>
					<input
						type="number"
						min={8}
						max={72}
						value={s.textFontSizeTB || 34}
						onChange={(e) =>
							setState((p) => ({
								...p,
								textFontSizeTB: Number(e.target.value),
							}))
						}
						style={{
							flex: 1,
							padding: "5px 8px",
							border: "1px solid #D1D5DB",
							borderRadius: 3,
							fontSize: 13,
							textAlign: "center",
						}}
					/>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<button
							onClick={() =>
								setState((p) => ({
									...p,
									textFontSizeTB: Math.min(72, (p.textFontSizeTB || 34) + 1),
								}))
							}
							style={{
								border: "1px solid #D1D5DB",
								background: "white",
								cursor: "pointer",
								fontSize: 9,
								padding: "2px 5px",
							}}
						>
							▲
						</button>
						<button
							onClick={() =>
								setState((p) => ({
									...p,
									textFontSizeTB: Math.max(8, (p.textFontSizeTB || 34) - 1),
								}))
							}
							style={{
								border: "1px solid #D1D5DB",
								borderTop: "none",
								background: "white",
								cursor: "pointer",
								fontSize: 9,
								padding: "2px 5px",
							}}
						>
							▼
						</button>
					</div>
				</div>
				<ColorAccordion
					label="TEXT COLOR"
					value={null}
					onChange={() => {}}
					swatches={PAINT_SWATCHES}
				/>
				<div
					style={{
						fontSize: 11,
						color: "#888",
						padding: "4px 0 8px",
						display: "flex",
						alignItems: "center",
						gap: 4,
					}}
				>
					<span style={{ fontSize: 14 }}>👁</span> Transparent Color Text
				</div>
				{/* bottom text */}
				<input
					type="text"
					value={s.textBottom || ""}
					placeholder="text2"
					onChange={(e) =>
						setState((p) => ({ ...p, textBottom: e.target.value }))
					}
					style={{
						width: "100%",
						padding: "7px 8px",
						border: "1px solid #D1D5DB",
						borderRadius: 3,
						fontSize: 12,
						marginBottom: 8,
						fontFamily: "Arial",
					}}
				/>
			</div>

			{/* Font left/right */}
			<div
				style={{
					borderTop: "1px solid #E8E8E8",
					paddingTop: 10,
					paddingBottom: 10,
				}}
			>
				<div
					style={{
						fontSize: 12,
						fontWeight: 700,
						color: "#1a2540",
						marginBottom: 8,
					}}
				>
					CHOOSE FONT FOR LEFT/RIGHT BORDER
				</div>
				<select
					value={s.textFont || "Arial"}
					onChange={(e) =>
						setState((p) => ({ ...p, textFont: e.target.value }))
					}
					style={{
						width: "100%",
						padding: "7px 8px",
						border: "1px solid #D1D5DB",
						borderRadius: 3,
						fontSize: 12,
						marginBottom: 8,
						fontFamily: "Arial",
					}}
				>
					{[
						"Arial",
						"Impact",
						"Georgia",
						"Trebuchet MS",
						"Times New Roman",
						"Courier New",
						"Verdana",
					].map((f) => (
						<option key={f}>{f}</option>
					))}
				</select>
				<input
					type="text"
					value={s.textLeft || ""}
					placeholder="text2"
					onChange={(e) =>
						setState((p) => ({ ...p, textLeft: e.target.value }))
					}
					style={{
						width: "100%",
						padding: "7px 8px",
						border: "1px solid #D1D5DB",
						borderRadius: 3,
						fontSize: 12,
						marginBottom: 6,
						fontFamily: "Arial",
					}}
				/>
				<div
					style={{
						display: "flex",
						gap: 6,
						alignItems: "center",
						marginBottom: 6,
					}}
				>
					<div
						style={{
							background: "#1a2540",
							color: "white",
							padding: "5px 8px",
							fontSize: 11,
							fontWeight: 700,
							borderRadius: 2,
						}}
					>
						FONT SIZE
					</div>
					<input
						type="number"
						min={8}
						max={72}
						value={s.textFontSizeLR || 18}
						onChange={(e) =>
							setState((p) => ({
								...p,
								textFontSizeLR: Number(e.target.value),
							}))
						}
						style={{
							flex: 1,
							padding: "5px 8px",
							border: "1px solid #D1D5DB",
							borderRadius: 3,
							fontSize: 13,
							textAlign: "center",
						}}
					/>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<button
							onClick={() =>
								setState((p) => ({
									...p,
									textFontSizeLR: Math.min(72, (p.textFontSizeLR || 18) + 1),
								}))
							}
							style={{
								border: "1px solid #D1D5DB",
								background: "white",
								cursor: "pointer",
								fontSize: 9,
								padding: "2px 5px",
							}}
						>
							▲
						</button>
						<button
							onClick={() =>
								setState((p) => ({
									...p,
									textFontSizeLR: Math.max(8, (p.textFontSizeLR || 18) - 1),
								}))
							}
							style={{
								border: "1px solid #D1D5DB",
								borderTop: "none",
								background: "white",
								cursor: "pointer",
								fontSize: 9,
								padding: "2px 5px",
							}}
						>
							▼
						</button>
					</div>
				</div>
				<ColorAccordion
					label="TEXT COLOR"
					value={null}
					onChange={() => {}}
					swatches={PAINT_SWATCHES}
				/>
				<div
					style={{
						fontSize: 11,
						color: "#888",
						padding: "4px 0 8px",
						display: "flex",
						alignItems: "center",
						gap: 4,
					}}
				>
					<span style={{ fontSize: 14 }}>👁</span> Transparent Color Text
				</div>
				<input
					type="text"
					value={s.textRight || ""}
					placeholder="text2"
					onChange={(e) =>
						setState((p) => ({ ...p, textRight: e.target.value }))
					}
					style={{
						width: "100%",
						padding: "7px 8px",
						border: "1px solid #D1D5DB",
						borderRadius: 3,
						fontSize: 12,
						marginBottom: 6,
						fontFamily: "Arial",
					}}
				/>
				<div style={{ marginTop: 6 }}>
					<div
						style={{
							fontSize: 11,
							fontWeight: 700,
							color: "#1a2540",
							marginBottom: 4,
						}}
					>
						SELECT FONT ORIENTATION
					</div>
					<select
						style={{
							width: "100%",
							padding: "7px 8px",
							border: "1px solid #D1D5DB",
							borderRadius: 3,
							fontSize: 12,
							fontFamily: "Arial",
						}}
					>
						<option>Top Inward/Bottom Inward</option>
						<option>Top Outward/Bottom Outward</option>
						<option>All Inward</option>
					</select>
				</div>
			</div>
		</div>
	);
}

function Step3Panel({ state, setState }) {
	const { sideCourts } = state;

	const addCourt = () => {
		setState((p) => ({
			...p,
			sideCourts: [
				...p.sideCourts,
				{
					id: Date.now(),
					lineColor: "#111111",
					elements: {
						key: true,
						keyArch: true,
						threePoint: true,
						centerCircle: true,
					},
				},
			],
		}));
	};

	const removeCourt = (id) =>
		setState((p) => ({
			...p,
			sideCourts: p.sideCourts.filter((c) => c.id !== id),
		}));
	const updateCourt = (id, key, val) =>
		setState((p) => ({
			...p,
			sideCourts: p.sideCourts.map((c) =>
				c.id === id ? { ...c, [key]: val } : c,
			),
		}));
	const toggleElement = (id, el) =>
		setState((p) => ({
			...p,
			sideCourts: p.sideCourts.map((c) =>
				c.id === id
					? { ...c, elements: { ...c.elements, [el]: !c.elements[el] } }
					: c,
			),
		}));

	const ELEMENTS = [
		{ id: "key", label: "Key" },
		{ id: "keyArch", label: "Key Arch" },
		{ id: "threePoint", label: "3 Point Arch" },
		{ id: "centerCircle", label: "Center Circle" },
	];

	return (
		<div>
			<button
				onClick={addCourt}
				style={{
					display: "flex",
					alignItems: "center",
					gap: 6,
					padding: "7px 12px",
					background: "#1a2540",
					color: "white",
					border: "none",
					borderRadius: 4,
					cursor: "pointer",
					fontSize: 12,
					fontWeight: 700,
					marginBottom: 12,
				}}
			>
				<span style={{ fontSize: 16, fontWeight: 700 }}>+</span> ADD COURT
			</button>
			{sideCourts.length === 0 && (
				<div
					style={{
						fontSize: 12,
						color: "#888",
						fontStyle: "italic",
						padding: "12px 0",
					}}
				>
					No side courts added yet. Click ADD COURT to add a basketball side
					court.
				</div>
			)}
			{sideCourts.map((ct, idx) => (
				<div key={ct.id} style={{ marginBottom: 12 }}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							background: "#1a2540",
							color: "white",
							padding: "8px 12px",
							borderRadius: "4px 4px 0 0",
						}}
					>
						<span style={{ fontSize: 12, fontWeight: 700 }}>
							COURT #{idx + 1}
						</span>
						<button
							onClick={() => removeCourt(ct.id)}
							style={{
								background: "rgba(255,255,255,0.2)",
								color: "white",
								border: "none",
								borderRadius: 3,
								width: 22,
								height: 22,
								cursor: "pointer",
								fontSize: 14,
								fontWeight: 700,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							−
						</button>
					</div>
					<div
						style={{
							border: "1px solid #E0E0E0",
							borderTop: "none",
							padding: "10px 12px",
							borderRadius: "0 0 4px 4px",
						}}
					>
						<ColorAccordion
							label="LINE COLOR"
							value={ct.lineColor}
							onChange={(v) => updateCourt(ct.id, "lineColor", v || "#111")}
							swatches={LINE_SWATCHES}
						/>
						<button
							style={{
								width: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								padding: "8px 0",
								border: "none",
								background: "transparent",
								cursor: "pointer",
								marginTop: 4,
							}}
						>
							<span style={{ fontSize: 11, fontWeight: 700, color: "#1a2540" }}>
								SELECT COURT ELEMENTS APPLICABLE
							</span>
							<span style={{ fontSize: 11, color: "#999" }}>▼</span>
						</button>
						<div style={{ paddingTop: 4 }}>
							{ELEMENTS.map((el) => (
								<label
									key={el.id}
									style={{
										display: "flex",
										alignItems: "center",
										gap: 8,
										padding: "4px 0",
										cursor: "pointer",
									}}
								>
									<input
										type="checkbox"
										checked={ct.elements[el.id] !== false}
										onChange={() => toggleElement(ct.id, el.id)}
										style={{ accentColor: "#1a2540", width: 14, height: 14 }}
									/>
									<span style={{ fontSize: 11, color: "#1a2540" }}>
										{el.label}
									</span>
								</label>
							))}
						</div>
					</div>
				</div>
			))}
			{sideCourts.length > 0 && (
				<button
					onClick={addCourt}
					style={{
						display: "flex",
						alignItems: "center",
						gap: 6,
						padding: "7px 12px",
						background: "#1a2540",
						color: "white",
						border: "none",
						borderRadius: 4,
						cursor: "pointer",
						fontSize: 12,
						fontWeight: 700,
					}}
				>
					<span style={{ fontSize: 16 }}>+</span> ADD COURT
				</button>
			)}
		</div>
	);
}

function Step4Panel({ state, setState }) {
	const SPORTS = [
		{ id: "mainVball", label: "MAIN VOLLEYBALL", sport: "volleyball" },
		{ id: "sideVball", label: "SIDE VOLLEYBALL", sport: "volleyball" },
		{ id: "badminton", label: "BADMINTON", sport: "badminton" },
		{ id: "pickleball", label: "PICKLEBALL", sport: "pickleball" },
	];
	const COURT_NUMS = Array.from({ length: 10 }, (_, i) => i + 1);

	return (
		<div>
			<div
				style={{
					fontSize: 13,
					fontWeight: 700,
					color: "#1a2540",
					marginBottom: 12,
				}}
			>
				ADD ADDITIONAL COURTS
			</div>
			{SPORTS.map((sp) => {
				const ac = state.additionalCourts[sp.id] || {
					open: false,
					selected: [],
					color: PAINT_SWATCHES[0],
					woodStain: WOOD_SWATCHES[0],
				};
				const toggle = () =>
					setState((p) => ({
						...p,
						additionalCourts: {
							...p.additionalCourts,
							[sp.id]: { ...ac, open: !ac.open },
						},
					}));
				const setField = (k, v) =>
					setState((p) => ({
						...p,
						additionalCourts: {
							...p.additionalCourts,
							[sp.id]: { ...ac, [k]: v },
						},
					}));
				const toggleNum = (n) => {
					const sel = ac.selected.includes(n)
						? ac.selected.filter((x) => x !== n)
						: [...ac.selected, n];
					setField("selected", sel);
				};
				const sizeMeta = {
					volleyball: "20x44",
					badminton: "20x44",
					pickleball: "20x44",
				};

				return (
					<div key={sp.id} style={{ borderTop: "1px solid #E8E8E8" }}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								padding: "10px 0",
							}}
						>
							<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
								<span style={{ fontSize: 15, opacity: 0.5 }}>👁</span>
								<span
									style={{ fontSize: 12, fontWeight: 700, color: "#1a2540" }}
								>
									{sp.label}
								</span>
							</div>
							<button
								onClick={toggle}
								style={{
									padding: "4px 12px",
									background: ac.open ? "#E8F0FE" : "#1a2540",
									color: ac.open ? "#1a2540" : "white",
									border: ac.open ? "1px solid #1a2540" : "none",
									borderRadius: 3,
									fontSize: 12,
									fontWeight: 700,
									cursor: "pointer",
									letterSpacing: "0.06em",
								}}
							>
								{ac.open ? "CLOSE" : "OPEN"}
							</button>
						</div>
						{ac.open && (
							<div style={{ paddingBottom: 16 }}>
								<div
									style={{
										fontSize: 11,
										fontWeight: 700,
										color: "#1a2540",
										marginBottom: 6,
									}}
								>
									COURTS
								</div>
								<div
									style={{
										display: "grid",
										gridTemplateColumns: "1fr 1fr",
										gap: 4,
										marginBottom: 12,
									}}
								>
									{COURT_NUMS.map((n) => (
										<button
											key={n}
											onClick={() => toggleNum(n)}
											style={{
												padding: "6px",
												border: "1px solid #DDD",
												borderRadius: 3,
												background: ac.selected.includes(n)
													? "#1a2540"
													: "white",
												color: ac.selected.includes(n) ? "white" : "#333",
												fontSize: 11,
												fontWeight: 600,
												cursor: "pointer",
												fontFamily: "Arial",
											}}
										>
											COURT #{n}
										</button>
									))}
								</div>
								<div
									style={{
										fontSize: 11,
										fontWeight: 700,
										color: "#1a2540",
										marginBottom: 6,
									}}
								>
									COLOR
								</div>
								<div
									style={{
										display: "grid",
										gridTemplateColumns: "repeat(4, 30px)",
										gap: 4,
										marginBottom: 12,
									}}
								>
									{PAINT_SWATCHES.map((hex, i) => (
										<button
											key={i}
											onClick={() => setField("color", hex)}
											style={{
												width: 30,
												height: 30,
												background: hex,
												border: "none",
												outline:
													ac.color === hex
														? "3px solid #1a73e8"
														: "1.5px solid rgba(0,0,0,0.15)",
												outlineOffset: ac.color === hex ? "1px" : "0",
												cursor: "pointer",
												borderRadius: 2,
											}}
										>
											{ac.color === hex && (
												<span
													style={{
														color:
															hex === "#FFFFFF" || hex === "#F5D800"
																? "#333"
																: "white",
														fontSize: 13,
													}}
												>
													✓
												</span>
											)}
										</button>
									))}
								</div>
								<div
									style={{
										fontSize: 11,
										fontWeight: 700,
										color: "#1a2540",
										marginBottom: 6,
									}}
								>
									WOOD STAIN
								</div>
								<div
									style={{
										display: "grid",
										gridTemplateColumns: "repeat(4, 30px)",
										gap: 4,
										marginBottom: 8,
									}}
								>
									{WOOD_SWATCHES.map((hex, i) => (
										<button
											key={i}
											onClick={() => setField("woodStain", hex)}
											style={{
												width: 30,
												height: 30,
												background: hex,
												border: "none",
												outline:
													ac.woodStain === hex
														? "3px solid #1a73e8"
														: "1.5px solid rgba(0,0,0,0.2)",
												outlineOffset: ac.woodStain === hex ? "1px" : "0",
												cursor: "pointer",
												borderRadius: 2,
											}}
										>
											{ac.woodStain === hex && (
												<span
													style={{
														color: "rgba(255,255,255,0.8)",
														fontSize: 13,
													}}
												>
													✓
												</span>
											)}
										</button>
									))}
								</div>
								<div style={{ fontSize: 11, color: "#555" }}>
									SIZE: {sizeMeta[sp.sport] || "20x44"}
								</div>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

function Step5Panel({ state }) {
	return (
		<div>
			<div
				style={{
					fontSize: 11,
					color: "#888",
					marginBottom: 12,
					fontStyle: "italic",
				}}
			>
				Review your complete gym design.
			</div>
			{[
				[
					"Room Size",
					(state.roomW || state.gymW) +
						" × " +
						(state.roomH || state.gymH) +
						" ft",
				],
				[
					"Court Size",
					{
						hs: "High School (84×50)",
						uni: "University (94×50)",
						custom: "Custom",
						none: "No Main Court",
					}[state.courtSizeId],
				],
				["Wood Stain", state.woodHex],
				["Line Color", state.lineColor],
				["Key Color", state.keyColor || "None"],
				["Key Arch", state.keyArchColor || "None"],
				["3-Point Fill", state.threePointColor || "None"],
				[
					"Border T/B",
					(state.borderTBHex || "None") +
						" (thick: " +
						state.borderTBThick +
						")",
				],
				[
					"Border L/R",
					(state.borderLRHex || "None") +
						" (thick: " +
						state.borderLRThick +
						")",
				],
				["Top Text", state.textTop || "—"],
				["Bottom Text", state.textBottom || "—"],
				["Side Courts", state.sideCourts.length + " court(s)"],
				["Logo", state.centerLogo ? "Uploaded" : "None"],
			].map(([k, v]) => (
				<div
					key={k}
					style={{
						display: "flex",
						justifyContent: "space-between",
						padding: "6px 0",
						borderBottom: "1px solid #F5F5F5",
						fontSize: 12,
					}}
				>
					<span style={{ color: "#666", fontWeight: 500 }}>{k}</span>
					<span
						style={{
							color: "#1a2540",
							fontWeight: 600,
							maxWidth: "55%",
							textAlign: "right",
							wordBreak: "break-all",
						}}
					>
						{typeof v === "string" && v.startsWith("#") ? (
							<span
								style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
							>
								<span
									style={{
										width: 14,
										height: 14,
										background: v,
										display: "inline-block",
										border: "1px solid rgba(0,0,0,0.2)",
										borderRadius: 2,
									}}
								/>
								{v}
							</span>
						) : (
							v
						)}
					</span>
				</div>
			))}
		</div>
	);
}

function Step6Panel({ state }) {
	return (
		<div>
			<div
				style={{
					fontSize: 13,
					fontWeight: 700,
					color: "#1a2540",
					marginBottom: 12,
				}}
			>
				REQUEST A QUOTE
			</div>
			<div
				style={{
					fontSize: 12,
					color: "#555",
					marginBottom: 16,
					lineHeight: 1.6,
				}}
			>
				Your design is complete. Fill out the form below to get a quote from our
				team.
			</div>
			{[
				["Name", "text", "Your name"],
				["School / Organization", "text", "School name"],
				["Email", "email", "Email address"],
				["Phone", "tel", "Phone number"],
				["City, State", "text", "Location"],
			].map(([lbl, type, ph]) => (
				<div key={lbl} style={{ marginBottom: 10 }}>
					<div
						style={{
							fontSize: 11,
							fontWeight: 700,
							color: "#1a2540",
							marginBottom: 4,
						}}
					>
						{lbl.toUpperCase()}
					</div>
					<input
						type={type}
						placeholder={ph}
						style={{
							width: "100%",
							padding: "8px 10px",
							border: "1px solid #D1D5DB",
							borderRadius: 3,
							fontSize: 12,
							fontFamily: "Arial",
						}}
					/>
				</div>
			))}
			<div style={{ marginBottom: 12 }}>
				<div
					style={{
						fontSize: 11,
						fontWeight: 700,
						color: "#1a2540",
						marginBottom: 4,
					}}
				>
					ADDITIONAL NOTES
				</div>
				<textarea
					rows={3}
					style={{
						width: "100%",
						padding: "8px 10px",
						border: "1px solid #D1D5DB",
						borderRadius: 3,
						fontSize: 12,
						fontFamily: "Arial",
						resize: "vertical",
					}}
				/>
			</div>
			<button
				style={{
					width: "100%",
					padding: "11px",
					background: "#16a34a",
					color: "white",
					border: "none",
					borderRadius: 4,
					fontSize: 13,
					fontWeight: 700,
					cursor: "pointer",
					letterSpacing: "0.06em",
					fontFamily: "Arial",
				}}
			>
				SUBMIT QUOTE REQUEST
			</button>
		</div>
	);
}

// ─── OPENING PAGE ─────────────────────────────────────────────────────────────

function OpeningPage({ onContinue }) {
	const [w, setW] = useState(100);
	const [h, setH] = useState(100);
	const [floorType, setFloorType] = useState("Wood");

	return (
		<div
			style={{
				minHeight: "100vh",
				background: "#F0EEE8",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontFamily: "Arial, sans-serif",
			}}
		>
			<div
				style={{
					background: "white",
					borderRadius: 4,
					padding: "48px 60px",
					maxWidth: 520,
					width: "100%",
					boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
					textAlign: "center",
				}}
			>
				<h1
					style={{
						fontSize: 28,
						fontWeight: 400,
						color: "#1a2540",
						marginBottom: 32,
						lineHeight: 1.4,
						fontFamily: "Georgia, serif",
					}}
				>
					Use our online tool to design your court.
				</h1>
				<div style={{ textAlign: "left" }}>
					<div
						style={{
							fontSize: 12,
							fontWeight: 700,
							color: "#555",
							letterSpacing: "0.1em",
							marginBottom: 10,
						}}
					>
						SELECT THE SIZE OF THE GYM
					</div>
					{/* Width */}
					<div
						style={{
							display: "flex",
							marginBottom: 8,
							borderRadius: 3,
							overflow: "hidden",
							border: "1px solid #DDD",
						}}
					>
						<div
							style={{
								background: "#1a2540",
								color: "white",
								padding: "10px 16px",
								fontSize: 12,
								fontWeight: 700,
								letterSpacing: "0.06em",
								minWidth: 110,
								display: "flex",
								alignItems: "center",
							}}
						>
							WIDTH <sup style={{ fontSize: 9 }}>FT</sup>
						</div>
						<input
							type="number"
							value={w}
							min={20}
							max={500}
							onChange={(e) => setW(Number(e.target.value))}
							style={{
								flex: 1,
								padding: "10px 12px",
								border: "none",
								fontSize: 14,
								outline: "none",
							}}
						/>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								borderLeft: "1px solid #DDD",
							}}
						>
							<button
								onClick={() => setW((v) => Math.min(500, v + 1))}
								style={{
									border: "none",
									background: "white",
									cursor: "pointer",
									fontSize: 11,
									padding: "4px 10px",
									borderBottom: "1px solid #EEE",
								}}
							>
								▲
							</button>
							<button
								onClick={() => setW((v) => Math.max(20, v - 1))}
								style={{
									border: "none",
									background: "white",
									cursor: "pointer",
									fontSize: 11,
									padding: "4px 10px",
								}}
							>
								▼
							</button>
						</div>
					</div>
					{/* Length */}
					<div
						style={{
							display: "flex",
							marginBottom: 20,
							borderRadius: 3,
							overflow: "hidden",
							border: "1px solid #DDD",
						}}
					>
						<div
							style={{
								background: "#1a2540",
								color: "white",
								padding: "10px 16px",
								fontSize: 12,
								fontWeight: 700,
								letterSpacing: "0.06em",
								minWidth: 110,
								display: "flex",
								alignItems: "center",
							}}
						>
							LENGTH <sup style={{ fontSize: 9 }}>FT</sup>
						</div>
						<input
							type="number"
							value={h}
							min={20}
							max={500}
							onChange={(e) => setH(Number(e.target.value))}
							style={{
								flex: 1,
								padding: "10px 12px",
								border: "none",
								fontSize: 14,
								outline: "none",
							}}
						/>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								borderLeft: "1px solid #DDD",
							}}
						>
							<button
								onClick={() => setH((v) => Math.min(500, v + 1))}
								style={{
									border: "none",
									background: "white",
									cursor: "pointer",
									fontSize: 11,
									padding: "4px 10px",
									borderBottom: "1px solid #EEE",
								}}
							>
								▲
							</button>
							<button
								onClick={() => setH((v) => Math.max(20, v - 1))}
								style={{
									border: "none",
									background: "white",
									cursor: "pointer",
									fontSize: 11,
									padding: "4px 10px",
								}}
							>
								▼
							</button>
						</div>
					</div>
					{/* Floor type */}
					<div
						style={{
							fontSize: 12,
							fontWeight: 700,
							color: "#555",
							letterSpacing: "0.1em",
							marginBottom: 10,
						}}
					>
						CHOOSE YOUR FLOOR TYPE
					</div>
					<div style={{ position: "relative", marginBottom: 24 }}>
						<select
							value={floorType}
							onChange={(e) => setFloorType(e.target.value)}
							style={{
								width: "100%",
								padding: "10px 14px",
								border: "1px solid #DDD",
								borderRadius: 3,
								fontSize: 14,
								appearance: "none",
								background: "white",
								cursor: "pointer",
								fontFamily: "Arial",
							}}
						>
							<option>Wood</option>
							<option>Synthetic</option>
							<option>Rubber</option>
						</select>
						<span
							style={{
								position: "absolute",
								right: 14,
								top: "50%",
								transform: "translateY(-50%)",
								pointerEvents: "none",
								color: "#888",
							}}
						>
							▼
						</span>
					</div>
					<button
						onClick={() => onContinue(w, h, floorType)}
						style={{
							width: "100%",
							padding: "14px",
							background: "#1a2540",
							color: "white",
							border: "none",
							borderRadius: 3,
							fontSize: 13,
							fontWeight: 700,
							cursor: "pointer",
							letterSpacing: "0.1em",
							fontFamily: "Arial",
						}}
					>
						CONTINUE
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

const STEP_TITLES = [
	"Main Basketball Court",
	"Main Basketball Court Design Options",
	"Side Basketball Court(s)",
	"Additional Courts",
	"Review Design",
	"Get a Quote",
];

const INITIAL_STATE = {
	roomW: 100,
	roomH: 100,
	floorType: "Wood",
	gymW: 84,
	gymH: 50,
	courtSizeId: "hs",
	showKey: true,
	showKeyArch: true,
	showThree: true,
	showCenter: true,
	woodHex: "#C8A060",
	borderTBHex: null,
	borderLRHex: null,
	borderTBThick: 30,
	borderLRThick: 60,
	lineColor: "#111111",
	courtInterior: null,
	keyColor: null,
	keyArchColor: null,
	threePointColor: null,
	centerLogo: null,
	logoSize: 55,
	logoOpacity: 40,
	textTop: "",
	textBottom: "",
	textLeft: "",
	textRight: "",
	textFont: "Arial",
	textFontSizeTB: 34,
	textFontSizeLR: 18,
	gridlines: false,
	sideCourts: [],
	additionalCourts: {},
};

export default function CourtBuilder() {
	const [started, setStarted] = useState(false);
	const [step, setStep] = useState(1);
	const [state, setState] = useState(INITIAL_STATE);
	const [zoom, setZoom] = useState(100);
	const [showQuoteModal, setShowQuoteModal] = useState(false);
	const fileRef = useRef(null);

	const handleLogo = (e) => {
		const f = e.target.files?.[0];
		if (!f) return;
		const r = new FileReader();
		r.onload = (ev) =>
			setState((p) => ({ ...p, centerLogo: ev.target.result }));
		r.readAsDataURL(f);
	};

	const handleContinue = (w, h, ft) => {
		setState((p) => ({ ...p, roomW: w, roomH: h, floorType: ft }));
		setStarted(true);
	};

	const handleClear = () => {
		setState((p) => ({
			...INITIAL_STATE,
			gymW: p.gymW,
			gymH: p.gymH,
			floorType: p.floorType,
		}));
	};

	const svgState = {
		...state,
		gridlines: state.gridlines,
	};

	if (!started) {
		return (
			<div
				style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
			>
				<HeaderBar />
				<div style={{ flex: 1 }}>
					<OpeningPage onContinue={handleContinue} />
				</div>
				<Footer />
			</div>
		);
	}

	const sidebarContent = {
		1: <Step1Panel state={state} setState={setState} />,
		2: (
			<Step2Panel
				state={state}
				setState={setState}
				fileRef={fileRef}
				handleLogo={handleLogo}
			/>
		),
		3: <Step3Panel state={state} setState={setState} />,
		4: <Step4Panel state={state} setState={setState} />,
		5: <Step5Panel state={state} />,
		6: <Step6Panel state={state} />,
	};

	return (
		<div
			style={{
				fontFamily: "Arial, sans-serif",
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<style>{`* { box-sizing: border-box; } input[type=number]::-webkit-inner-spin-button { opacity: 0; } input[type=number] { -moz-appearance: textfield; } input[type=range] { accent-color: #1a2540; } [data-court-canvas="true"] { user-select: none; }`}</style>

			<HeaderBar />

			<div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
				<NavBar
					step={step}
					totalSteps={6}
					stepTitle={STEP_TITLES[step - 1]}
					onStartOver={() => {
						setState(INITIAL_STATE);
						setStep(1);
						setStarted(false);
					}}
					onClear={handleClear}
					onBack={() => setStep((s) => Math.max(1, s - 1))}
					onNext={() => {
						if (step < 6) setStep((s) => s + 1);
						else setShowQuoteModal(true);
					}}
					isFinal={step === 6}
				/>

				<CourtHeader title={STEP_TITLES[step - 1]} />

				<div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
					{/* Sidebar */}
					<div
						style={{
							width: 300,
							flexShrink: 0,
							background: "white",
							borderRight: "1px solid #E0E0E0",
							overflowY: "auto",
							maxHeight: "calc(100vh - 120px)",
						}}
					>
						<div style={{ padding: "12px 14px" }}>{sidebarContent[step]}</div>
					</div>

					{/* Court area */}
					<div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
						<CourtControls
							roomW={state.roomW}
							roomH={state.roomH}
							setRoomW={(w) => setState((p) => ({ ...p, roomW: w }))}
							setRoomH={(h) => setState((p) => ({ ...p, roomH: h }))}
							zoom={zoom}
							setZoom={setZoom}
							gridlines={state.gridlines}
							setGridlines={(v) => setState((p) => ({ ...p, gridlines: v }))}
						/>
						<CourtCanvas zoom={zoom} setZoom={setZoom}>
							<MainCourtSVG state={svgState} canvasW={840} canvasH={472} />
						</CourtCanvas>
						<CourtBottom
							gridlines={state.gridlines}
							setGridlines={(v) => setState((p) => ({ ...p, gridlines: v }))}
							onGetPdf={() => setShowQuoteModal(true)}
						/>
					</div>
				</div>

				{/* Quote Modal */}
				{showQuoteModal && (
					<div
						style={{
							position: "fixed",
							inset: 0,
							background: "rgba(0,0,0,0.6)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							zIndex: 9999,
							padding: 20,
						}}
						onClick={() => setShowQuoteModal(false)}
					>
						<div
							style={{
								background: "white",
								borderRadius: 8,
								padding: 32,
								maxWidth: 460,
								width: "100%",
								boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<h2 style={{ margin: "0 0 8px", fontSize: 20, color: "#1a2540" }}>
								Request a Quote
							</h2>
							<p style={{ margin: "0 0 20px", fontSize: 13, color: "#666" }}>
								Connect your contact form here. This is a placeholder.
							</p>
							<div
								style={{
									background: "#F8FAFC",
									borderRadius: 8,
									padding: 16,
									marginBottom: 16,
									border: "1px solid #E2E8F0",
									fontSize: 12,
								}}
							>
								<div
									style={{
										fontWeight: 700,
										color: "#1a2540",
										textTransform: "uppercase",
										letterSpacing: "0.08em",
										marginBottom: 10,
									}}
								>
									Design Summary
								</div>
								<div
									style={{
										display: "grid",
										gridTemplateColumns: "1fr 1fr",
										gap: "5px 14px",
									}}
								>
									{[
										[
											"Room",
											(state.roomW || state.gymW) +
												"×" +
												(state.roomH || state.gymH) +
												" ft",
										],
										[
											"Court",
											{
												hs: "HS Std",
												uni: "University",
												custom: "Custom",
												none: "None",
											}[state.courtSizeId],
										],
										["Stain", state.woodHex],
										["Lines", state.lineColor],
										["Key", state.keyColor || "None"],
										["Border TB", state.borderTBHex || "None"],
										["Border LR", state.borderLRHex || "None"],
										["Top Text", state.textTop || "—"],
										["Logo", state.centerLogo ? "Uploaded" : "None"],
									].map(([k, v]) => (
										<div key={k}>
											<span style={{ color: "#9CA3AF" }}>{k}: </span>
											<span style={{ fontWeight: 600, color: "#374151" }}>
												{v}
											</span>
										</div>
									))}
								</div>
							</div>
							<button
								onClick={() => setShowQuoteModal(false)}
								style={{
									width: "100%",
									padding: "12px",
									background: "#1a2540",
									color: "white",
									border: "none",
									borderRadius: 6,
									fontWeight: 700,
									fontSize: 14,
									cursor: "pointer",
								}}
							>
								Close
							</button>
						</div>
					</div>
				)}
			</div>
			{/* end inner flex column */}

			<Footer />
		</div>
	);
}
