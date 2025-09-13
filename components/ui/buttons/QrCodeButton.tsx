'use client'

import { useAppSelector } from "@/redux/hook";
import { Button, Input } from "@heroui/react";
import { BsQrCode } from "react-icons/bs";
import { QRCodeCanvas } from "qrcode.react";
import { useState, useRef } from "react";
import DrawerModel from "../utils/DrawerModel";
import { FaDownload } from "react-icons/fa";
import { useTheme } from "next-themes";

interface IProps { }

const QrCodeButton = ({ }: IProps) => {
    const appearance = useAppSelector((state) => state.appearance.theme);
    const { theme } = useTheme()
    const [open, setOpen] = useState(false);
    const [qrColor, setQrColor] = useState<string>("");
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const downloadQRCode = () => {
        if (canvasRef.current) {
            const dataUrl = canvasRef.current.toDataURL();
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "qrcode.png";
            link.click();
        }
    };

    return (
        <>
            <Button
                className={`
          ${appearance === "blackWhite"
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : appearance === "default"
                            ? "bg-primary text-white"
                            : appearance === "blossom"
                                ? "bg-pink-500 text-white"
                                : ""
                    }`}
                isIconOnly
                onPress={() => setOpen(true)}
                size="sm"
                variant="flat"
                radius="full"
            >
                <BsQrCode size={14} />
            </Button>

            <DrawerModel
                isModal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Share Profile"
                description="Scan or download the QR code to share this profile."
            >
                <div className="flex flex-col justify-center items-center my-4">
                    <Input
                        type="color"
                        value={qrColor || (appearance === "blackWhite" ? "#ffffff" : "#000000")}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="my-3 max-w-[200px] font-medium"
                        size="sm"
                        labelPlacement="outside"
                        radius="sm"
                        label="QR Code Color"
                    />

                    <QRCodeCanvas
                        ref={canvasRef}
                        value={typeof window !== "undefined" ? window.location.href : ""}
                        size={256}
                        level="M"
                        includeMargin={true}
                        bgColor="transparent"
                        fgColor={qrColor || (theme === "light" ? "#000000" : "#ffffff")}
                    />

                    <div className="my-4">
                        <Button
                            onPress={downloadQRCode}
                            startContent={<FaDownload />}
                            className="bg-black text-white dark:bg-white dark:text-black font-medium"
                            radius="full"
                            variant="flat"
                        >
                            Download QR Code
                        </Button>
                    </div>
                </div>
            </DrawerModel>
        </>
    );
};

export default QrCodeButton;
