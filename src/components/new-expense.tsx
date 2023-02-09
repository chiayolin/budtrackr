import { AddIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Button,
  Stack,
  Heading,
  ButtonGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react'

import { useRouter } from 'next/router';
import { useState } from 'react';


export default function NewExpense({ budgetId }) {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [values, setValues] = useState({
    name:   '',
    desc:   '',
    amount: '',
    date: new Date(),
  });

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          budgetId: budgetId
        }),
      });
    } catch(error) {
      console.log(error);
    }

    // refresh server-side props
    router.replace(router.asPath);
    onClose();
  }

  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }));
  }

  return (
    <Box>
      <Button
        size='sm'
        onClick={onOpen}
        colorScheme='green'
        border='1px'
        borderColor='green.600'
      >
        New item
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent ml='4' mr='4'>
        <form onSubmit={formSubmitHandler}>
          <ModalHeader>
            <Heading size='md'>Add a new expense</Heading>
          </ModalHeader>
          <ModalBody>
            <Stack spacing='4'>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  required
                  name='name'
                  value={values.name}
                  placeholder='required'
                  onChange={formChangeHandler}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  name='desc'
                  value={values.desc}
                  placeholder='optioanl'
                  onChange={formChangeHandler}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                  required
                  name='date'
                  type='date'
                  onChange={formChangeHandler}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Amount</FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    pointerEvents='none'
                    children='$'
                  />
                  <NumberInput
                    w='100%'
                    precision={2}
                    step={0.01}
                    min={0}
                  >
                    <NumberInputField
                      required
                      name='amount'
                      value={values.amount}
                      placeholder='required'
                      onChange={formChangeHandler}
                      borderLeftRadius='0'
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                size='sm'
                type='submit'
                colorScheme='green'
                border='1px'
                borderColor='green.600'
              >
                Create
              </Button>
              <Button
                size='sm'
                variant='ghost'
                onClick={onClose}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
