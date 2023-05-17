import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { makeAuthenticatedRequest } from "../utils/axiosUtils";
import { useAuth } from "../context/userContext";

type FormValues = {
  username: string;
  profileUrl: string;
};

interface UserPopOverProps {
  username: string;
  profileUrl: string;
}

const UserPopOver = ({ username, profileUrl }: UserPopOverProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { jwtToken, updateCurrentUser } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);

    const updatedUser = await makeAuthenticatedRequest(
      "https://techdome-backend-production.up.railway.app/update-user",
      {
        name: data.username,
        profileUrl: data.profileUrl,
      },
      "POST",
      jwtToken
    );
    console.log("updated User", updatedUser);
    updateCurrentUser(updatedUser.data);
    onClose();
  };

  useEffect(() => {
    setValue("username", username);
    setValue("profileUrl", profileUrl);
  }, [username, profileUrl, setValue]);

  return (
    <>
      <Box display="inline-block" mr={3}></Box>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton
            p={4}
            rounded={"full"}
            colorScheme="whiteAlpha"
            size="sm"
            icon={<EditIcon />}
            aria-label={""}
          />
        </PopoverTrigger>
        <PopoverContent p={5} color="brand.black">
          Edit Profile
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="New Username"
                type="text"
                {...register("username", {})}
              />
              {errors.username && (
                <span className="text-red-300">Enter a valid input</span>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>profileUrl</FormLabel>
              <Input
                placeholder="Profile Url"
                type="text"
                {...register("profileUrl", {})}
              />
              {errors.profileUrl && (
                <span className="text-red-300">Enter a valid input</span>
              )}
            </FormControl>
            <Box mt={5}>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </Box>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UserPopOver;
