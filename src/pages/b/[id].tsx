import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import prisma from '@/lib/prisma';
import moment from 'moment';

import {
  Box, Button, ButtonGroup, Card, CardBody, Flex, Heading, Progress, Spacer,
  Stack, Stat, StatGroup, StatLabel, StatNumber, Text, Tooltip
} from '@chakra-ui/react';
import { ArrowBackIcon, SettingsIcon } from '@chakra-ui/icons';
import NewExpense from '@/components/new-expense';
import Layout from '@/components/layout';

interface Expense {
  id: string,
  budgetId: string,
  name: string,
  desc?: string,
  date: Date,
  amount: number,
}

interface Budget {
  id: string,
  name: string,
  desc?: string,
  budget: number,
  expend: number,
  expenses: Expense[],
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return { props: { budget: {} } }
  }

  const budget = await prisma.budget.findUnique({
    where: {
      id: context.params?.id as string
    },
    include: {
      expenses: true
    },
  });

  return {
    props: {
      budget: JSON.parse(JSON.stringify(budget)),
    }
  };
}

export default function Budget({ budget }: { budget: Budget }) {
  const router = useRouter();

  return (
    <Layout>
      <Flex alignItems='center'>
        <Button
          size='sm'
          variant='outline'
          leftIcon={<ArrowBackIcon />}
          onClick={() => router.push('/')}
        >
          Back
        </Button>
        <Spacer />
        <ButtonGroup>
          <NewExpense budgetId={budget.id}/>
          <Button size='sm' variant='outline'><SettingsIcon /></Button>
        </ButtonGroup>
      </Flex>
      <Box mt='4' mb='4' alignSelf='center'>
        <Heading size='lg'>{budget.name}</Heading>
        <Text size='sm' color='grey'>{budget.desc}</Text>
        <StatGroup mt='4' as={Flex}>
          <Stat mr='1'>
            <StatLabel>Budget</StatLabel>
            <StatNumber>${budget.budget.toFixed(2)}</StatNumber>
          </Stat>
          <Spacer />
          <Stat mr='1'>
            <StatLabel>Expenditure</StatLabel>
            <StatNumber color='orange'>${budget.expend.toFixed(2)}</StatNumber>
          </Stat>
          <Spacer />
          <Stat mr='1'>
            <StatLabel>Remaining</StatLabel>
            <StatNumber color='green'>${
              (budget.budget - budget.expend).toFixed(2)
            }</StatNumber>
          </Stat>
          <Spacer />
        </StatGroup>
        <Flex alignItems='center' mt='2'>
          <Box width='100%'>
            <Progress
              colorScheme='blue'
              size='xs'
              borderRadius='lg'
              min={0}
              max={budget.budget}
              value={budget.expend}
            />
          </Box>
          <Text ml='3' fontWeight='medium'>
            {(100 * (budget.expend/budget.budget)).toFixed()}%
          </Text>
          <Text ml='1' fontWeight='medium'>
            used
          </Text>
        </Flex>
      </Box>

      <Stack mt='4'>
        <Text fontWeight='medium' fontSize='lg'>Details</Text>

        {Object.values(budget?.expenses || []).map((expense) => (
          <Card key={expense.id} variant='outline'>
          <Tooltip
            label={expense.desc}
            hasArrow
          >
            <CardBody>
              <Flex flexWrap='nowrap' alignItems='center'>
                <Box>
                <Heading size='xs' mb='1'>{expense.name}</Heading>
                <Text color='grey' fontSize='xs' >
                  {moment(expense.date).format('LL')}
                </Text>
                </Box>
                <Spacer />
                <Text color='blue.600'>${expense.amount}</Text>
              </Flex>
            </CardBody>
            </Tooltip>
          </Card>
        ))}
      </Stack>
    </Layout>
  );
}

