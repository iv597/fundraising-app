import CopyAndPaste from "@/components/Icons/CopyAndPaste";
import Instagram from "@/components/Icons/Instagram";
import LinkedIn from "@/components/Icons/LinkedIn";
import Message from "@/components/Icons/Message";
import Modal from "@/components/Modal";
import { Program } from "@/generated/prisma";
import { FormEventHandler } from "react";

type Props = {
    program: Program;
    isOpen?: boolean;
    onClose?: FormEventHandler<HTMLFormElement>;
};

export default function ProgramThankYou({ program, isOpen, onClose }: Props) {
    const { image, shortDescription } = program;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-gray-600">
                    Thank You!
                </h3>
                <p className="mb-4">Your donation will help a lot.</p>

                <img src={image} alt={shortDescription} />

                <h4 className="mt-4 mb-4">Spread the word and help more.</h4>
                <div className="flex items-center justify-center mb-4">
                    <button className="btn btn-square mx-1">
                        <Instagram />
                    </button>
                    <button className="btn btn-square mx-1">
                        <LinkedIn />
                    </button>
                    <button className="btn btn-square mx-1">
                        <Message />
                    </button>
                </div>

                <button
                    type="button"
                    className="btn btn-outline w-full flex items-center justify-center"
                >
                    <CopyAndPaste /> Copy Link
                </button>
            </div>
        </Modal>
    );
}
