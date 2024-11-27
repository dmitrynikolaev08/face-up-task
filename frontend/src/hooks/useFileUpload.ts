import { useState } from 'react';

export const useFileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const errors: string[] = [];

    selectedFiles.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        errors.push(`${file.name} is too large. Maximum size is 5MB.`);
      }
    });

    if (errors.length > 0) {
      setFileErrors(errors);
      return;
    }

    setFileErrors([]);
    setFiles(selectedFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const clearFiles = () => {
    setFiles([]);
    setFileErrors([]);
  };

  return {
    files,
    fileErrors,
    handleFileChange,
    removeFile,
    clearFiles,
  };
};
