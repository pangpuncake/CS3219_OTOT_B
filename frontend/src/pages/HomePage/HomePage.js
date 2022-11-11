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
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { animalSvcClient } from '../../utils/request.ts';

const HomePage = () => {
  const [animals, setAnimals] = useState([]);
  const [symbols, setSymbols] = useState([]);

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

  const awsLambdaFunctionHandler = async event => {
    event.preventDefault();
    try {
      const search = event.target.symbol.value;
      let url =
        'https://2u76pzfzoa.execute-api.ap-southeast-1.amazonaws.com/test/symbol' +
        '?search=' +
        search;
      fetch(url, {
        method: 'GET',
      })
        .then(response => {
          return response.text();
        })
        .then(data => {
          const parsed_json = JSON.parse(data);
          const syms = Object.entries(parsed_json).map(([sym, val]) => {
            return (
              <Tr key={sym}>
                <Td>{sym}</Td>
                <Td>{val}</Td>
              </Tr>
            );
          });
          setSymbols(syms);
        });
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
      <Box my={2}>
        <Heading size={1}>Find exchange symbols</Heading>
        <Text>AWS Lambda Function Call</Text>
        <form onSubmit={awsLambdaFunctionHandler}>
          <FormControl isRequired>
            <FormLabel>Symbol Search</FormLabel>
            <Input id="symbol" name="symbol" placeholder="name" />
          </FormControl>
          <Button my={2} type="submit">
            Submit
          </Button>
        </form>
      </Box>
      <Box my={2}>
        <Heading size={1}>Symbol List</Heading>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Symbols</TableCaption>
            <Thead>
              <Tr>
                <Th>Symbol</Th>
                <Th>Full Name</Th>
              </Tr>
            </Thead>
            <Tbody>{symbols}</Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Center>
  );
};

export default HomePage;
