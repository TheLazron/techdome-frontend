import { useForm, SubmitHandler } from "react-hook-form";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";

type FormValues = {
  email: string;
  password: string;
};

const LoginCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    console.log("data", data);

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={"transparent"}
      w={"120"}
      mx={2}
    >
      <Stack spacing={8} maxW={"lg"}>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={14}>
          <Stack spacing={6} w={"120"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  })}
                />
                {errors.email && (
                  <span className="text-red-300">Enter a valid input</span>
                )}
              </FormControl>

              <FormControl isRequired id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-300">This field is required</span>
                )}
              </FormControl>

              <Stack mt={4}>
                <Button
                  bg={"brand.black"}
                  color={"white"}
                  _hover={{
                    bg: "brand.secondary",
                  }}
                  type="submit"
                >
                  Log In
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginCard;
