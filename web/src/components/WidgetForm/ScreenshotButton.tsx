import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
    onScreenshotTook: (screenshot: string | null) => void;
    screenshot: string | null;
}

export function ScreenshotButton(props: ScreenshotButtonProps) {
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

    async function handleTakeScreenshot() {
        setIsTakingScreenshot(true);

        const canvas = await html2canvas(document.querySelector("html")!);
        const base64Image = canvas.toDataURL("image/png");

        props.onScreenshotTook(base64Image);

        setIsTakingScreenshot(false);
    };

    return !props.screenshot ? (
        <button
            type="button"
            onClick={handleTakeScreenshot}
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
        >
            {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
        </button>
    ) : (
        <button
            type="button"
            onClick={() => props.onScreenshotTook(null)}
            className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
            style={{
                backgroundImage: `url(${props.screenshot})`,
                backgroundPosition: "right bottom",
                backgroundSize: 180
            }}
        >
            <Trash weight="fill" />
        </button>
    );
};