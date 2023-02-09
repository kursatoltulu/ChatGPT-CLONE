/*
OpenAI, Express.js, dotenv ve cors npm paketlerini kullanarak bir OpenAI uygulaması oluşturmak için gerekli kurulumu gerçekleştirmektedir.
İlk olarak, Express.js dahil olmak üzere tüm bağımlılıkları yüklemek için express paketi varsayılan olarak import edilir.
Sonra, dotenv paketi ile uygulama için gerekli çevre değişkenlerini yüklemek için dotenv paketi import edilir.
Ardından, cors paketi ile yerel makine üzerinde gelen istekleri kabul etmek için cors paketi import edilir.
 Son olarak, OpenAI Api konfigürasyonunu ve OpenAI Api sınıfını tanımlamak için Configuration ve OpenAIApi sınıflarını import eder.


*/

import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

console.log(process.env.OPENAI_API_KEY)


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//Express web frameworkü kullanılarak bir sunucu başlatmak için yazılmıştır.
//App nesnesi, Express nesnesini başlatmaya yetkilendirilmiştir.
//app.get() metodu, kullanıcıya gönderilmesini istediği mesaj için özel bir rota oluşturur. 

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Kürşat OLTULU 170255037!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0, // Daha yüksek değerler, modelin daha fazla risk alacağı anlamına gelir.
      max_tokens: 3000, // Tamamlamada üretilecek maksimum belirteç sayısı.
      top_p: 1, // çekirdek örneklemesi olarak adlandırılan sıcaklıkla örnekleme
      frequency_penalty: 0.5, 
      presence_penalty: 0, 
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Hop!! Burada bir şeyler yanlış oldu.');
  }
})

app.listen(5000, () => console.log('Yapay Zeka serverı burada açıldı http://localhost:5000'))