import { authOptions } from '@/src/pages/api/auth/[...nextauth]';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '@/src/lib/prisma';

import Layout from '@/src/components/layout';
import NewExpense from '@/src/components/new-expense';
import { Box, Button, ButtonGroup, Card, CardBody, Divider, Flex, Heading, Spacer, Stack, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, Text, Tooltip } from '@chakra-ui/react';
import { ArrowBackIcon, SettingsIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

import moment from 'moment';

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
        <StatGroup mt='4'>
          <Stat>
            <StatLabel>Budget</StatLabel>
            <StatNumber>${budget.budget}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Expenditure</StatLabel>
            <StatNumber color='orange'>${budget.expend}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Remaining</StatLabel>
            <StatNumber color='green'>${budget.budget - budget.expend}</StatNumber>
          </Stat>
        </StatGroup>
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

