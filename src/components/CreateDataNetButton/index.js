import React, { useState } from 'react'
import UploadSeedData from '../DataNet/UploadSeedData';
import CreateDataNet from '../DataNet/CreateDataNet';

const CreateDataNetButton = () => {
  const [createDataNetOpen, setCreateDataNetOpen] = useState(false);
  const [uploadSeedDataopen, setUploadSeedDataopen] = useState(false);

  const handleUploadSeedData = () => {
    setUploadSeedDataopen(!uploadSeedDataopen)
  }

  const handleCreateDataNetOpen = () => {
    setCreateDataNetOpen(!createDataNetOpen)
  }

  const closeCreateDataNetPopup = () => {
    setCreateDataNetOpen(false);
  }

  return (
    <>
      <div className='flex items-center gap-4 md:ml-6 md:gap-6 lg:ml-8 lg:gap-8'>
        <div className="items-center gap-2.5 p-1 bg-[#F9F9F9] dark:bg-[#161618] border border-[#E7E7E9] dark:border-[#2E2E30] rounded-lg">
          <button
            type="button"
            onClick={handleCreateDataNetOpen}
            className="flex justify-center items-center gap-1 rounded-md bg-[#FB6340] px-[0.75rem] py-[0.3rem] text-base font-[400] shadow-cus-1 text-white w-auto"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              className="w-6 h-6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.8721 3H4.87207C4.47425 3 4.09271 3.15804 3.81141 3.43934C3.53011 3.72064 3.37207 4.10218 3.37207 4.5V19.5C3.37207 19.8978 3.53011 20.2794 3.81141 20.5607C4.09271 20.842 4.47425 21 4.87207 21H19.8721C20.2699 21 20.6514 20.842 20.9327 20.5607C21.214 20.2794 21.3721 19.8978 21.3721 19.5V4.5C21.3721 4.10218 21.214 3.72064 20.9327 3.43934C20.6514 3.15804 20.2699 3 19.8721 3ZM19.8721 19.5H4.87207V4.5H19.8721V19.5ZM16.8721 12C16.8721 12.1989 16.7931 12.3897 16.6524 12.5303C16.5117 12.671 16.321 12.75 16.1221 12.75H13.1221V15.75C13.1221 15.9489 13.0431 16.1397 12.9024 16.2803C12.7617 16.421 12.571 16.5 12.3721 16.5C12.1732 16.5 11.9824 16.421 11.8417 16.2803C11.7011 16.1397 11.6221 15.9489 11.6221 15.75V12.75H8.62207C8.42316 12.75 8.23239 12.671 8.09174 12.5303C7.95109 12.3897 7.87207 12.1989 7.87207 12C7.87207 11.8011 7.95109 11.6103 8.09174 11.4697C8.23239 11.329 8.42316 11.25 8.62207 11.25H11.6221V8.25C11.6221 8.05109 11.7011 7.86032 11.8417 7.71967C11.9824 7.57902 12.1732 7.5 12.3721 7.5C12.571 7.5 12.7617 7.57902 12.9024 7.71967C13.0431 7.86032 13.1221 8.05109 13.1221 8.25V11.25H16.1221C16.321 11.25 16.5117 11.329 16.6524 11.4697C16.7931 11.6103 16.8721 11.8011 16.8721 12Z"
                fill="white"
              />
            </svg>
            Create <span className='hidden sm:block'>DataNet</span>
          </button>
        </div>
        <button className="border border-[#E7E7E9] dark:border-[#2E2E30] rounded-lg p-1"
          onClick={handleUploadSeedData}
        >
          <svg width="33" height="32" viewBox="0 0 33 32" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.3721 17.9998V25.9998C28.3721 26.265 28.2667 26.5194 28.0792 26.7069C27.8916 26.8945 27.6373 26.9998 27.3721 26.9998H5.37207C5.10685 26.9998 4.8525 26.8945 4.66496 26.7069C4.47743 26.5194 4.37207 26.265 4.37207 25.9998V17.9998C4.37207 17.7346 4.47743 17.4802 4.66496 17.2927C4.8525 17.1052 5.10685 16.9998 5.37207 16.9998C5.63729 16.9998 5.89164 17.1052 6.07918 17.2927C6.26671 17.4802 6.37207 17.7346 6.37207 17.9998V24.9998H26.3721V17.9998C26.3721 17.7346 26.4774 17.4802 26.665 17.2927C26.8525 17.1052 27.1069 16.9998 27.3721 16.9998C27.6373 16.9998 27.8916 17.1052 28.0792 17.2927C28.2667 17.4802 28.3721 17.7346 28.3721 17.9998ZM12.0796 9.70731L15.3721 6.41356V17.9998C15.3721 18.265 15.4774 18.5194 15.665 18.7069C15.8525 18.8945 16.1069 18.9998 16.3721 18.9998C16.6373 18.9998 16.8916 18.8945 17.0792 18.7069C17.2667 18.5194 17.3721 18.265 17.3721 17.9998V6.41356L20.6646 9.70731C20.8522 9.89495 21.1067 10.0004 21.3721 10.0004C21.6374 10.0004 21.8919 9.89495 22.0796 9.70731C22.2672 9.51967 22.3726 9.26517 22.3726 8.99981C22.3726 8.73445 22.2672 8.47995 22.0796 8.29231L17.0796 3.29231C16.9867 3.19933 16.8764 3.12557 16.755 3.07525C16.6336 3.02493 16.5035 2.99902 16.3721 2.99902C16.2407 2.99902 16.1105 3.02493 15.9891 3.07525C15.8677 3.12557 15.7574 3.19933 15.6646 3.29231L10.6646 8.29231C10.4769 8.47995 10.3715 8.73445 10.3715 8.99981C10.3715 9.26517 10.4769 9.51967 10.6646 9.70731C10.8522 9.89495 11.1067 10.0004 11.3721 10.0004C11.6374 10.0004 11.8919 9.89495 12.0796 9.70731Z" fill="#82838A"/>
          </svg>
        </button>
      </div>

      {
        uploadSeedDataopen && <UploadSeedData isUploadSeedOpen={uploadSeedDataopen} setIsUploadSeedOpen={handleUploadSeedData}/>
      }
      {
        createDataNetOpen && <CreateDataNet isOpen={createDataNetOpen} onOpenChange={setCreateDataNetOpen} isClose={closeCreateDataNetPopup}/>
      }
    </>
  )
}

export default CreateDataNetButton;
