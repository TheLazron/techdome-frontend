import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MultiSelect, useMultiSelect } from "chakra-multiselect";
import { makeAuthenticatedRequest } from "../utils/axiosUtils";
import { useAuth } from "../context/userContext";

type FormValues = {
  title: string;
  description: string;
  content: string;
};

const CreateBlogModal = () => {
  const { jwtToken } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { value, options, onChange } = useMultiSelect({
    value: [],
    options: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const blogData = {
      ...data,
      tags: value,
    };
    console.log("blogData", blogData);
    const newBlog = await makeAuthenticatedRequest(
      "http://localhost:3300/create-blog",
      blogData,
      "POST",
      jwtToken
    );
    console.log("new created", newBlog);
  };

  return (
    <>
      <Button bgColor="brand.black" onClick={onOpen}>
        +Create New
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Create a New Blog</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Title"
                  type="text"
                  {...register("title", {
                    required: true,
                  })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Description"
                  type="text"
                  {...register("description", {
                    required: true,
                  })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Blog Content</FormLabel>
                <Textarea
                  placeholder="Content"
                  {...register("content", {
                    required: true,
                  })}
                />
              </FormControl>

              <FormControl mt={4}>
                <MultiSelect
                  options={options}
                  value={value}
                  label="Tags"
                  onChange={onChange}
                  create
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateBlogModal;
