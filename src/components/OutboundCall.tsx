import {
  Box,
  Button,
  createListCollection,
  Grid,
  GridItem,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { DEFAULT_ELEVEN_LABS_VOICES } from '../constants'
import { useState } from 'react'
import { toaster } from '../components/ui/toaster'
import { post } from '../utils/requests'

const voices = createListCollection({
  items: DEFAULT_ELEVEN_LABS_VOICES,
})

type OutboundCallProps = {
  apiKey: string
}

export const OutboundCall = (props: OutboundCallProps) => {
  const { apiKey } = props
  const [isProcessing, setIsProcessing] = useState(false)
  const [agentNumber, setAgentNumber] = useState('')
  const [userNumber, setUserNumber] = useState('')
  const [prompt, setPrompt] = useState('')
  const [voiceOption, setVoiceOption] = useState<string[]>([])
  const [initialMessage, setInitialMessage] = useState('')

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="5rem">
      <GridItem>
        <Text style={{ marginRight: '1rem' }}>Agent Number</Text>
        <Input
          mb={2}
          value={agentNumber}
          onChange={(e) => setAgentNumber(e.target.value)}
          placeholder="Agent number"
        />
        <Text style={{ marginRight: '1rem' }}>User Number</Text>
        <Input
          mb={2}
          value={userNumber}
          onChange={(e) => setUserNumber(e.target.value)}
          placeholder="User number"
        />

        <Text style={{ marginRight: '1rem' }}>Initial Message</Text>
        <Input
          mb={2}
          value={initialMessage}
          onChange={(e) => setInitialMessage(e.target.value)}
          placeholder="Initial Message"
        />
      </GridItem>
      <GridItem>
        <Box mb={2}>
          <SelectRoot
            collection={voices}
            size="sm"
            width="320px"
            value={voiceOption}
            onValueChange={(e) => setVoiceOption(e.value)}
          >
            <Text style={{ marginRight: '1rem' }}>Voice</Text>
            <SelectTrigger className="select">
              <SelectValueText placeholder="Select voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.items.map((voice) => (
                <SelectItem
                  className="select-item"
                  item={voice}
                  key={voice.value}
                >
                  {voice.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
        <Box>
          <Text style={{ marginRight: '1rem' }}>Prompt</Text>
          <Textarea
            mb={2}
            size={'xl'}
            h={'10rem'}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </Box>
        <Box className="card">
          <Button
            className="btn end"
            disabled={isProcessing}
            onClick={async () => {
              try {
                setIsProcessing(true)
                await post(apiKey, '/v1/calls/create', {
                  from_number: agentNumber,
                  to_number: userNumber,
                  agent: {
                    prompt: {
                      content: prompt,
                    },
                    voice: {
                      type: 'voice_eleven_labs',
                      voice_id: voiceOption?.length && voiceOption[0],
                    },
                    initial_message: initialMessage,
                  },
                })
                toaster.create({
                  title: 'Call Created',
                  type: 'success',
                })
              } catch (err) {
                toaster.create({
                  title: 'API Error',
                  description: `${err}`,
                  type: 'error',
                })
              } finally {
                setIsProcessing(false)
              }
            }}
          >
            Call
          </Button>
        </Box>
      </GridItem>
    </Grid>
  )
}
