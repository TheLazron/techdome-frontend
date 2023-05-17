import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
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
import { useEffect } from "react";
import { makeAuthenticatedRequest } from "../utils/axiosUtils";
import { useAuth } from "../context/userContext";
import { EditIcon } from "@chakra-ui/icons";

type FormValues = {
  title: string;
  description: string;
  content: string;
};

interface EditBlogModalProps {
  id: string;
  title: string;
  description: string;
  content: string;
  tags?: string[];
}

const EditBlogModal = ({
  id,
  title,
  description,
  content,
  tags,
}: EditBlogModalProps) => {
  const { jwtToken } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { value, options, onChange } = useMultiSelect({
    value: [...tags!],
    options: [],
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const blogData = {
      ...data,
      tags: value,
    };
    console.log("blogData", blogData);
    const newBlog = await makeAuthenticatedRequest(
      `http://localhost:3300/update-blog/${id}`,
      blogData,
      "POST",
      jwtToken
    );
    console.log("new created", newBlog);
    onClose();
  };

  useEffect(() => {
    setValue("title", title);
    setValue("description", description);
    setValue("content", content);
  }, [title, description, content, setValue]);

  return (
    <>
      <IconButton
        onClick={onOpen}
        p={2}
        rounded={"full"}
        colorScheme="gray"
        size="md"
        icon={<EditIcon />}
        aria-label={""}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Edit Blog</ModalHeader>
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
                {errors.title && (
                  <span className="text-red-300">Enter a valid input</span>
                )}
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
                {errors.description && (
                  <span className="text-red-300">Enter a valid input</span>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Blog Content</FormLabel>
                <Textarea
                  placeholder="Content"
                  {...register("content", {
                    required: true,
                  })}
                />
                {errors.content && (
                  <span className="text-red-300">Enter a valid input</span>
                )}
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

export default EditBlogModal;
