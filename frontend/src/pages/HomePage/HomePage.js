import {
  Center,
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { animalSvcClient } from '../../utils/request.ts';

const HomePage = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await animalSvcClient.get('/');
      let respAnimals = resp.data.animals;
      respAnimals = respAnimals.map(({ _id, name, count }) => {
        return (
          <Tr key={_id}>
            <Td>{name}</Td>
            <Td>{count}</Td>
          </Tr>
        );
      });
      setAnimals(respAnimals);
    }
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const addAnimalHandler = async event => {
    event.preventDefault();
    try {
      const resp = await animalSvcClient.post('/', {
        name: event.target.addname.value,
        count: event.target.addcount.value,
      });
      console.log(resp.data);
      alert(resp.data.message);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  const updateAnimalHandler = async event => {
    event.preventDefault();
    try {
      const resp = await animalSvcClient.put('/', {
        name: event.target.updatename.value,
        count: event.target.updatecount.value,
      });
      console.log(resp.data);
      alert(resp.data.message);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  const deleteAnimalHandler = async event => {
    event.preventDefault();
    try {
      const resp = await animalSvcClient.delete('/', {
        name: event.target.deletename.value,
      });
      console.log(event.target.deletename.value);
      console.log(resp.data);
      alert(resp.data.message);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  return (
    <Center sx={{ width: '80vw' }} flexDir="column" justifySelf="center">
      <Box my={2}>
        <Heading size={1}>Animal List</Heading>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Animals</TableCaption>
            <Thead>
              <Tr>
                <Th>Animal</Th>
                <Th isNumeric>Count</Th>
              </Tr>
            </Thead>
            <Tbody>{animals}</Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Box my={2}>
        <Heading size={1}>Add Animal</Heading>
        <form onSubmit={addAnimalHandler}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input id="addname" name="addname" placeholder="name" />
            <FormLabel>Count</FormLabel>
            <Input id="addcount" name="addcount" placeholder="count" />
          </FormControl>
          <Button my={2} type="submit">
            Submit
          </Button>
        </form>
      </Box>
      <Box my={2}>
        <Heading size={1}>Update Animal</Heading>
        <form onSubmit={updateAnimalHandler}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input id="updatename" name="updatename" placeholder="name" />
            <FormLabel>Count</FormLabel>
            <Input id="updatecount" name="updatecount" placeholder="count" />
          </FormControl>
          <Button my={2} type="submit">
            Submit
          </Button>
        </form>
      </Box>
      <Box my={2}>
        <Heading size={1}>Delete Animal</Heading>
        <form onSubmit={deleteAnimalHandler}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input id="deletename" name="deletename" placeholder="name" />
          </FormControl>
          <Button my={2} type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default HomePage;
