import React, { useRef } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { Input, Select, SelectItem } from '@nextui-org/react';

const DownArrow = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" className='w-5 h-5' fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.9132 8.16305L10.6632 14.4131C10.5762 14.5005 10.4727 14.5698 10.3587 14.6171C10.2447 14.6644 10.1226 14.6888 9.99918 14.6888C9.8758 14.6888 9.75362 14.6644 9.63967 14.6171C9.52571 14.5698 9.42222 14.5005 9.33512 14.4131L3.08512 8.16305C2.909 7.98693 2.81006 7.74806 2.81006 7.49899C2.81006 7.24992 2.909 7.01105 3.08512 6.83493C3.26124 6.65881 3.50011 6.55986 3.74918 6.55986C3.99826 6.55986 4.23713 6.65881 4.41325 6.83493L9.99997 12.4216L15.5867 6.83415C15.7628 6.65803 16.0017 6.55908 16.2507 6.55908C16.4998 6.55908 16.7387 6.65803 16.9148 6.83415C17.0909 7.01027 17.1899 7.24914 17.1899 7.49821C17.1899 7.74728 17.0909 7.98615 16.9148 8.16227L16.9132 8.16305Z" fill="#B5B6BA"/>
  </svg>
)

const UploadSeedData = ({ isUploadSeedOpen, setIsUploadSeedOpen }) => {

  const seedFileInputRef = useRef(null);

  // Function to trigger file input click
  const handleFileUploadClick = () => {
    if (seedFileInputRef.current) {
      seedFileInputRef.current.click();
    }
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      console.log(file,"file");
    }
  };

  const selectData = [
    {key: "csv", label: "CSV"},
    {key: "pdf", label: "PDF"},
    {key: "excel", label: "Excel"},
    {key: "sql", label: "SQL"},
  ];

  return (
    <Modal
      isOpen={isUploadSeedOpen}
      placement={"bottom-center"}
      onOpenChange={setIsUploadSeedOpen}
      hideCloseButton={true}  // Disable the default close button
      size='lg'
      scrollBehavior={"inside"}
      backdrop='opaque'
    >
      <ModalContent className='rounded-xl'>
        {(onClose) => (
          <>
            <ModalHeader className='flex justify-between items-center'>
              <h3
                className="m-0 text-2xl font-bold leading-6 text-[#000000] dark:text-white"
              >
                Upload Seed Data
              </h3>

              <div className='icon cursor-pointer' onClick={onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" className='w-6 h-6' fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5306 9.53063L13.0603 12L15.5306 14.4694C15.6003 14.5391 15.6556 14.6218 15.6933 14.7128C15.731 14.8039 15.7504 14.9015 15.7504 15C15.7504 15.0985 15.731 15.1961 15.6933 15.2872C15.6556 15.3782 15.6003 15.4609 15.5306 15.5306C15.4609 15.6003 15.3782 15.6556 15.2872 15.6933C15.1961 15.731 15.0986 15.7504 15 15.7504C14.9015 15.7504 14.8039 15.731 14.7128 15.6933C14.6218 15.6556 14.5391 15.6003 14.4694 15.5306L12 13.0603L9.53063 15.5306C9.46095 15.6003 9.37822 15.6556 9.28718 15.6933C9.19613 15.731 9.09855 15.7504 9 15.7504C8.90146 15.7504 8.80388 15.731 8.71283 15.6933C8.62179 15.6556 8.53906 15.6003 8.46938 15.5306C8.3997 15.4609 8.34442 15.3782 8.30671 15.2872C8.269 15.1961 8.24959 15.0985 8.24959 15C8.24959 14.9015 8.269 14.8039 8.30671 14.7128C8.34442 14.6218 8.3997 14.5391 8.46938 14.4694L10.9397 12L8.46938 9.53063C8.32865 9.38989 8.24959 9.19902 8.24959 9C8.24959 8.80098 8.32865 8.61011 8.46938 8.46937C8.61011 8.32864 8.80098 8.24958 9 8.24958C9.19903 8.24958 9.3899 8.32864 9.53063 8.46937L12 10.9397L14.4694 8.46937C14.5391 8.39969 14.6218 8.34442 14.7128 8.3067C14.8039 8.26899 14.9015 8.24958 15 8.24958C15.0986 8.24958 15.1961 8.26899 15.2872 8.3067C15.3782 8.34442 15.4609 8.39969 15.5306 8.46937C15.6003 8.53906 15.6556 8.62178 15.6933 8.71283C15.731 8.80387 15.7504 8.90145 15.7504 9C15.7504 9.09855 15.731 9.19613 15.6933 9.28717C15.6556 9.37822 15.6003 9.46094 15.5306 9.53063ZM21.75 12C21.75 13.9284 21.1782 15.8134 20.1068 17.4168C19.0355 19.0202 17.5127 20.2699 15.7312 21.0078C13.9496 21.7458 11.9892 21.9389 10.0979 21.5627C8.20656 21.1865 6.46928 20.2579 5.10571 18.8943C3.74215 17.5307 2.81355 15.7934 2.43735 13.9021C2.06114 12.0108 2.25422 10.0504 2.99218 8.26884C3.73013 6.48726 4.97982 4.96451 6.58319 3.89317C8.18657 2.82183 10.0716 2.25 12 2.25C14.585 2.25273 17.0634 3.28084 18.8913 5.10872C20.7192 6.93661 21.7473 9.41498 21.75 12ZM20.25 12C20.25 10.3683 19.7661 8.77325 18.8596 7.41655C17.9531 6.05984 16.6646 5.00242 15.1571 4.37799C13.6497 3.75357 11.9909 3.59019 10.3905 3.90852C8.79017 4.22685 7.32016 5.01259 6.16637 6.16637C5.01259 7.32015 4.22685 8.79016 3.90853 10.3905C3.5902 11.9908 3.75358 13.6496 4.378 15.1571C5.00242 16.6646 6.05984 17.9531 7.41655 18.8596C8.77326 19.7661 10.3683 20.25 12 20.25C14.1873 20.2475 16.2843 19.3775 17.8309 17.8309C19.3775 16.2843 20.2475 14.1873 20.25 12Z" fill="#82838A" className='fill-[#82838A] dark:fill-white'/>
                </svg>
              </div>
            </ModalHeader>
            <div className='px-4'>
              <hr className="w-full h-px bg-[#E7E7E9] border-0 dark:bg-[#3E3E3E]" />
            </div>
            <ModalBody className='pt-0 pb-6 px-4 md:px-6'>
              <div className='mt-6 flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                  <Select
                    label="Select DataNet"
                    placeholder="Select Select DataNet"
                    labelPlacement="outside"
                    className="max-w-full"
                    // disableSelectorIconRotation
                    classNames={{
                      label: "block text-sm font-medium text-[#68686F] dark:text-[#9F9FA5] group-data-[filled-within=true]:text-[#68686F] group-data-[filled-within=true]:dark:text-[#9F9FA5] group-data-[filled=true]:text-[#68686F] group-data-[filled=true]:dark:text-[#9F9FA5] mb-2",
                      base: "max-w-full",
                      trigger: "px-3 py-2 border border-[#E7E7E9] dark:border-[#3E3E3E] bg-transparent data-[hover=true]:bg-transparent shadow-none rounded-lg"
                    }}
                    selectorIcon={<DownArrow />}
                  >
                    {selectData.map((animal) => (
                      <SelectItem key={animal.key}>
                        {animal.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className='flex flex-col'>
                  <Input
                    type="file"
                    ref={seedFileInputRef} // Attach the ref to input
                    label="Banner Image"
                    placeholder=' '
                    labelPlacement='outside'
                    className='hidden'
                    classNames={
                      {
                        label: "block text-sm font-medium text-[#68686F] dark:text-[#9F9FA5] group-data-[filled-within=true]:text-[#68686F] group-data-[filled-within=true]:dark:text-[#9F9FA5] mb-2",
                        inputWrapper: "block bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent shadow-none w-full px-3 py-2 border border-[#E7E7E9] dark:border-[#3E3E3E] data-[hover=true]:border-[#E7E7E9] data-[hover=true]:dark:border-[#3E3E3E] group-data-[focus=true]:border-[#E7E7E9] group-data-[focus=true]:dark:border-[#3E3E3E] rounded-lg focus:outline-none",
                        input: "text-base font-medium text-[#343437] dark:text-white placeholder-[#9B9CA1]"
                      }
                    }
                    onChange={handleFileChange}
                  />
                  <label className='block text-sm font-medium text-[#68686F] dark:text-[#9F9FA5] mb-2'>
                    Banner Image
                  </label>
                  <div className='flex items-center justify-between cursor-pointer border border-[#E7E7E9] dark:border-[#3E3E3E] rounded-lg py-[0.5rem] h-10 px-4' onClick={handleFileUploadClick}>
                    <p className='m-0 text-[#9B9CA1] text-base'>Upload Banner Image</p>
                    <div className='icon'>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className='w-5 h-5' xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5 11.25V16.25C17.5 16.4158 17.4342 16.5747 17.3169 16.6919C17.1997 16.8092 17.0408 16.875 16.875 16.875H3.125C2.95924 16.875 2.80027 16.8092 2.68306 16.6919C2.56585 16.5747 2.5 16.4158 2.5 16.25V11.25C2.5 11.0842 2.56585 10.9253 2.68306 10.8081C2.80027 10.6909 2.95924 10.625 3.125 10.625C3.29076 10.625 3.44973 10.6909 3.56694 10.8081C3.68415 10.9253 3.75 11.0842 3.75 11.25V15.625H16.25V11.25C16.25 11.0842 16.3158 10.9253 16.4331 10.8081C16.5503 10.6909 16.7092 10.625 16.875 10.625C17.0408 10.625 17.1997 10.6909 17.3169 10.8081C17.4342 10.9253 17.5 11.0842 17.5 11.25ZM7.31719 6.06719L9.375 4.0086V11.25C9.375 11.4158 9.44085 11.5747 9.55806 11.6919C9.67527 11.8092 9.83424 11.875 10 11.875C10.1658 11.875 10.3247 11.8092 10.4419 11.6919C10.5592 11.5747 10.625 11.4158 10.625 11.25V4.0086L12.6828 6.06719C12.8001 6.18447 12.9591 6.25035 13.125 6.25035C13.2909 6.25035 13.4499 6.18447 13.5672 6.06719C13.6845 5.94992 13.7503 5.79086 13.7503 5.625C13.7503 5.45915 13.6845 5.30009 13.5672 5.18282L10.4422 2.05782C10.3841 1.99971 10.3152 1.95361 10.2393 1.92215C10.1635 1.8907 10.0821 1.87451 10 1.87451C9.91787 1.87451 9.83654 1.8907 9.76066 1.92215C9.68479 1.95361 9.61586 1.99971 9.55781 2.05782L6.43281 5.18282C6.31554 5.30009 6.24965 5.45915 6.24965 5.625C6.24965 5.79086 6.31554 5.94992 6.43281 6.06719C6.55009 6.18447 6.70915 6.25035 6.875 6.25035C7.04085 6.25035 7.19991 6.18447 7.31719 6.06719Z" fill="#B5B6BA"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="flex w-full justify-center items-center gap-1 rounded-lg h-10 bg-[#356FF5] border border-[#356FF5] px-3 py-2 text-base font-normal max-w-xs mx-auto mt-3 text-white"
                >
                  Upload
                </button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default UploadSeedData;
