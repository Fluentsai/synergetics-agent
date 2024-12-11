import { useState } from 'react'
import logo from '/logo.svg'
import './App.css'
import {
  Box,
  ChakraProvider,
  createSystem,
  defaultConfig,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react'
import { GearIcon } from './components/ui/gear-icon'
import { Switch } from './components/ui/switch'
import { Toaster } from './components/ui/toaster'
import { OutboundCall } from './components/OutboundCall'
import { InboundCall } from './components/InboundCall'
import { PasswordInput } from './components/ui/password-input'

const system = createSystem(defaultConfig)

function App() {
  const [apiKey, setApiKey] = useState('')
  const [isOutbound, setIsOutbound] = useState(false)
  const [showApiInput, setShowApiInput] = useState(false)

  return (
    <ChakraProvider value={system}>
      <Box className="wrapper">
        <IconButton
          className="btn end"
          onClick={() => setShowApiInput(!showApiInput)}
        >
          <GearIcon />
        </IconButton>
        {showApiInput && (
          <Box className="end" mr={6} mt={-6}>
            <Text style={{ marginRight: '1rem' }}>API Key</Text>
            <PasswordInput
              mb={2}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="API Key"
            />
          </Box>
        )}
        <Box>
          <Image src={logo} className="logo" alt="Company logo" />
        </Box>
        <Grid mb={8} templateColumns="repeat(2, 1fr)" gap="5rem">
          <GridItem>
            {isOutbound ? (
              <Heading as="h1" className="pageTitle">
                Create an outbound agent call
              </Heading>
            ) : (
              <Heading as="h1" className="pageTitle">
                Create an inbound agent
              </Heading>
            )}
          </GridItem>
          <GridItem textAlign={'right'}>
            <Switch
              checked={isOutbound}
              onCheckedChange={(e) => setIsOutbound(e.checked)}
            >
              Outbound
            </Switch>
          </GridItem>
        </Grid>
        {isOutbound ? (
          <OutboundCall apiKey={apiKey} />
        ) : (
          <InboundCall apiKey={apiKey} />
        )}
      </Box>
      <Toaster />
    </ChakraProvider>
  )
}

export default App
