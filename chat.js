import { ChatAnthropic } from "@langchain/anthropic";
import { response } from "express";
import { createAgent, HumanMessage, tool } from "langchain";
import {z} from 'zod';

const API= process.env.CLAUDE_API_KEY

function recensione ({media}) {
    console.log(`Recensione per ${media} chiamata`);
    return `${media} ha punti forti ma anche difetti`;
}

const functionTool = tool(recensione, {
    name: 'recensione_tool',
    description: 'Tool per avere una recensione completa con i punti forti o non di un media',
    schema: z.object({
        media: z.string().describe('Il nome del film o del media di cui si vuole la recensione')
    })
});

const model = new ChatAnthropic({
    model: 'claude-haiku-4-5',
    apiKey: API
});

const agent = createAgent({
    model,
    tools: [functionTool]
})

const message = `
    Come è il nuovo film di Super Mario? Me lo consigli?
`

agent.invoke({
    messages:[
        new HumanMessage(message)
    ]
}).then(aiResponse => {
    const lastMessage = aiResponse.messages[aiResponse.messages.length - 1];
    console.log(lastMessage.content);
    
})