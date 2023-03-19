const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.post('/api/generate-thank-you', async (req, res) => {
    const prompt = req.query.prompt;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model:"gpt-3.5-turbo-0301",
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
        console.log(response);
        res.send(response.data.choices[0].message.content);
        console.log(response.data.choices[0].message.content)
    } catch (error) {
        console.error('Error fetching data from OpenAI API:', error);
        res.status(500).send('Error fetching data from OpenAI API');
    }

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
