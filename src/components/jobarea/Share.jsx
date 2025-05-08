import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import {
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";

export default function ShareJob({ popupOpen, setPopupOpen, text }) {
const emailSubject = `Job title - ${text?.job_title}`;
const emailBody = `${text?.job_description}`;
const jobUrl = `${window.location.origin}/career/${text?.id}`;  // Proper HTML link
const jobContent = `${emailBody} \n\nApply here: ${jobUrl}`;
const handleEmailShare = () => {
  const subject = encodeURIComponent(emailSubject);
  const body = encodeURIComponent(jobContent);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
};

  // Function to handle sharing via WhatsApp
  const handleWhatsappShare = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      jobContent,
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Function to handle sharing via Facebook
  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=&quote=${encodeURIComponent(
      jobContent,
    )}`;
    window.open(facebookUrl, "_blank");
  };

  // Function to handle sharing via Telegram
  const handleTelegramShare = () => {
    const telegramUrl = `https://t.me/share/url?url=&text=${encodeURIComponent(
      jobContent,
    )}`;
    window.open(telegramUrl, "_blank");
  };

  function close() {
    setPopupOpen(false);
  }

  return (
    <Dialog
      open={popupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-sm rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h3 className="text-[0.9rem] font-bold">Share Invitation</h3>
              <button
                type="button"
                onClick={close}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>

            <p className="text-sm font-medium text-gray-lightMedium">
              Share Invitation via
            </p>
            <div className="mb-4 mt-5 flex gap-4">
              <button onClick={handleEmailShare}>
                <EmailIcon size={40} round />
              </button>
              <button onClick={handleWhatsappShare}>
                <WhatsappIcon size={40} round />
              </button>
              <button onClick={handleFacebookShare}>
                <FacebookIcon size={40} round />
              </button>
              <button onClick={handleTelegramShare}>
                <TelegramIcon size={40} round />
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
