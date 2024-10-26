export default function ChooseOfferLetterType({ open, setPopupOpen }) {
  const handleNavigation = () => {};
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-base font-bold text-black/70">
              Offer Letter Type
            </h2>
            <div className="mt-7 flex w-full items-center gap-10">
              <div className="flex items-center text-sm">
                <input type="radio" name="" id="" />
                <span className="ml-1">Conditional</span>
              </div>
              <div className="flex items-center text-sm">
                <input type="radio" name="" id="" />
                <span className="ml-1">Unconditional</span>
              </div>
            </div>
            <div className="mt-10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  setResume("");
                  setPopupOpen(false);
                }}
                className="h-10 w-full rounded-lg border border-black/20 px-4 text-sm font-semibold text-black/70 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleNavigation}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-black/80 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
