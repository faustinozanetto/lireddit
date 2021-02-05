import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react';

type DeletePostDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onYes: () => void;
  postName: string;
};

export const DeletePostDialog: React.FC<DeletePostDialogProps> = ({
  isOpen,
  onClose,
  onYes,
  postName,
}) => {
  const cancelRef = React.useRef();
  const toast = useToast();
  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Post?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete the post {postName}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme='red'
              ml={3}
              onClick={() => {
                onYes();
                toast({
                  title: 'Post Deleted',
                  description: 'Successfully delete the post!',
                  status: 'success',
                  isClosable: true,
                  duration: 6000,
                });
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
