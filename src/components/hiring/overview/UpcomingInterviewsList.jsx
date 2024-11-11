export const UpcomingInterviewsList = () => {
  return (
    <>
      <h5 className="px-7 font-semibold">Upcoming Interviews</h5>
      <div className="w-full rounded-sm bg-white px-7 py-3">
        <div className="flex flex-col gap-3 rounded-lg border border-black/20 px-6 py-4">
          <div className="flex w-full items-center gap-3">
            <div className="w-fit text-nowrap text-sm font-semibold">
              Today 10:30 Pm
            </div>
            <div className="w-full border-b border-b-black/30"></div>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center justify-between rounded-md bg-gray-smoke px-6 py-3">
              <div className="flex items-center gap-2">
                <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                  <div className="w-12">
                    <img src={"/assets/images/hiring/avatar/a1.png"} />
                  </div>
                  <div className="w-12">
                    <img src={"/assets/images/hiring/avatar/a1.png"} />
                  </div>
                  <div className="w-12">
                    <img src={"/assets/images/hiring/avatar/a1.png"} />
                  </div>
                </div>
                <div className="">Zera + 2 more</div>
              </div>
              <div className="">UI/UX Design intern</div>
            </div>
            <div className="flex items-center justify-between rounded-md bg-gray-smoke px-6 py-3">
              <div className="flex items-center gap-2">
                <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                  <div className="w-12">
                    <img src={"/assets/images/hiring/avatar/a1.png"} />
                  </div>
                  <div className="w-12">
                    <img src={"/assets/images/hiring/avatar/a1.png"} />
                  </div>
                  <div className="w-12">
                    <img src={"/assets/images/hiring/avatar/a1.png"} />
                  </div>
                </div>
                <div className="">Zera + 2 more</div>
              </div>
              <div className="">UI/UX Design intern</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
