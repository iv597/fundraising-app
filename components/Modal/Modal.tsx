import { FormEventHandler } from "react";

type Props = {
    isOpen?: boolean;
    onClose?: FormEventHandler<HTMLFormElement>;
    children: React.ReactNode | React.ReactNode[];
};

export default function Modal({ isOpen, onClose, children }: Props) {
    return (
        <dialog id="my_modal_3" className="modal" open={isOpen}>
            <div className="modal-box w-full h-full rounded-none sm:h-auto">
                <form method="dialog" onSubmit={onClose}>
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-square btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <div>{children}</div>
            </div>
        </dialog>
    );
}
