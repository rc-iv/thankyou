const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.post('/api/generate-thank-you', async (req, res) => {
    const prompt = req.query.prompt;
    console.log(prompt);
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model:"gpt-3.5-turbo",
                messages: [{role: "user", content: prompt}],
                max_tokens: 150,
                n: 1,
                stop: null,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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',
                },
            }
        );
        res.send(response.data.choices[0].message.content);

    } catch (error) {
        console.error('Error fetching data from OpenAI API:', error);
        res.status(500).send('Error fetching data from OpenAI API');
    }

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
