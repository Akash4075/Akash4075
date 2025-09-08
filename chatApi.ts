export interface ChatResponse {
  botReply: string;
}

export async function sendMessageToBot(message: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:3001/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    return data.botReply;

  } catch (error) {
    console.error('Failed to send message to bot:', error);
    return 'Error: Failed to get response from AI';
  }
}
