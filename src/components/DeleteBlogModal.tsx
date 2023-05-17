import { DeleteIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { makeAuthenticatedRequest } from "../utils/axiosUtils";
import { useAuth } from "../context/userContext";
interface DeleteBlogModalProps {
  blogId: string;
}

const DeleteBlogModal = ({ blogId }: DeleteBlogModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { jwtToken } = useAuth();

  const deleteBlog = async (blogId: string) => {
    const response = await makeAuthenticatedRequest(
      `http://localhost:3300/delete-blog/${blogId}`,
      {},
      "DELETE",
      jwtToken
    );
    onClose();
  };
  return (
    <>
      <IconButton
        onClick={onOpen}
        p={2}
        rounded={"full"}
        colorScheme="red"
        size="md"
        icon={<DeleteIcon />}
        aria-label={""}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Blog?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>This action cannot be undone</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              colorScheme="red"
              onClick={async () => {
                await deleteBlog(blogId);
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteBlogModal;
