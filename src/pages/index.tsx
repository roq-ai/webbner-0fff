import { Button, Flex, Heading, Image, Text, Stack, useBreakpointValue, Box, Link } from '@chakra-ui/react';

import { signIn, signUp, requireNextAuth } from '@roq/nextjs';

import Head from 'next/head';
import { HelpBox } from 'components/help-box';

function HomePage() {
  return (
    <>
      <Head>
        <title>{`webbner`}</title>

        <meta
          name="description"
          content="Discover Your Signature Scent with Webbner: Explore, Compare, and Create Customized Perfumes in a World of Premium Fragrances and Personalized Aromas."
        />
      </Head>

      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack position="relative" spacing={6} w={'full'} maxW={'lg'}>
            <HelpBox />
            <Image src="/roq.svg" alt="Logo" w="150px" mb="8" />
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text as={'span'}>Explore</Text>{' '}
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'cyan.400',
                  zIndex: -1,
                }}
              >
                {`webbner`}
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              {`Discover Your Signature Scent with Webbner: Explore, Compare, and Create Customized Perfumes in a World of Premium Fragrances and Personalized Aromas.`}
            </Text>

            <Text>Organization</Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'cyan.500'}
                color={'white'}
                _hover={{
                  bg: 'cyan.700',
                }}
                onClick={() => signUp('business-owner')}
              >
                Create Account
              </Button>
              <Button rounded={'full'} onClick={() => signIn('business-owner')}>
                Login
              </Button>
            </Stack>

            <Text>End Customer</Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'cyan.500'}
                color={'white'}
                _hover={{
                  bg: 'cyan.700',
                }}
                onClick={() => signUp('end-customer')}
              >
                Register
              </Button>
              <Button rounded={'full'} onClick={() => signIn('end-customer')}>
                Login
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex position="relative" flex={1}>
          <Image
            src={
              'https://images.unsplash.com/photo-1458538977777-0549b2370168?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc4OTJ8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTJDcGVyc29uYWxpemVkfGVufDB8fHx8MTY4Njg0Njg5Mnww&ixlib=rb-4.0.3&q=80&w=1080'
            }
            alt={'Login Image'}
            objectFit={'cover'}
          />
          <Box position="absolute" top="0" backgroundColor="rgba(0,0,0,0.6)" width="100%" py="2">
            <Text align="center" fontSize="sm" color="white">
              Photo by{' '}
              <Link
                href="https://unsplash.com/@jweiller?utm_source=roq-generator&utm_medium=referral"
                isExternal
                color="teal.200"
              >{`Jessica Weiller`}</Link>{' '}
              on{' '}
              <Link
                href="https://unsplash.com/?utm_source=roq-generator&utm_medium=referral"
                isExternal
                color="teal.200"
              >
                Unsplash
              </Link>
            </Text>
          </Box>
        </Flex>
      </Stack>
    </>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: true,
  redirectTo: '/users',
})(HomePage);
