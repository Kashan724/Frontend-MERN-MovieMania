import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

// Firebase configuration
const firebaseConfig = {
  projectId: 'mern-stack-7d963',
  privateKeyId: '55d00ccc5078575279a1884c5ef5d7865e462662',
  privateKey: `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkAw0a1EGbyPuI\nWvqUCWCtufFV3dLwXX7DelHzeOUkSwx+px+PweWL1DcVQ8T4yUwbQRdobN+yiiMi\n5G+S/2PRwG4NjcIm7elJryyJJw7cG13W8QlrCKh9yzMBMMr+llCHWFWZQemb4DVR\nSW8RPhvHl1h2D/Nz47yNK6SGQPdpCVzCT6sQAdfpC29HFfZnNm7A5ZGcsO9u79R2\nUADEZPY7Qi7OpCQeXUNHeHcBdaM5rmMPFgIJwjK4+EkJBnzaD2Ii3gk5x69zxrmc\nV3KEHmhGdSC1Tk05cFwu29Kc1Vi3Y9yD2gvWWoIv/irQp9FIHsbxH0/dWG8P+BLB\noJkNsl2lAgMBAAECggEARRJD4pihSMpLpBEslkucu40jZdYVj8TQLeLFwJOZbL9u\nc6hOUmyGD21ABWSU/3FG6/NtuDyhuL8ULQ2nL3D+yMcRkgOxUFPBe5aaWuhoCao8\nytiX7sumqdN5l3bFBpKnN1isM+7eQxcZXTJf5BMT/+ptBsuQ661tKsbGcwPJLiJl\nzbwLvT49niZcyhriGWrET/dAnQ4UW42FbMXd8E8sCHJw0SbDbmJI5ifZIACs3ml+\nvWPxGZdFNjsI8Gm4DaOary3IVXLM4lNhOSuF5SSww/g4ppPSe8dZx46NkMJmgo57\nRJr5/xoQCmz1BC6CnDlR/eFO/43mi5K9bIBC9269wQKBgQDiQwt+zK/d56hSZQsl\nXDq07bXb0g6hTIPm+ws2y3wNP2Zcdg8ND5YXqlDd5DD/5/dN9j6Ep1dwmKArV2IL\nsIwpUJalvdBHWWwhAK4LfO4WyasSCDMKw9Pa08h7P8J5wRNGZZz8yGOLFcHa8+lE\nMg5OVjWTwuZ+eEu0sGKYJM9ALwKBgQC5kYDIcreuphSnMV5Bfp7YTAeim3P9T/b5\njijwDiicL/aY4TGdnTHOfDOgKjynL6vUegXOb9gk/N94Q4AnChdA9TleaJIGG4nn\nl4lbAEOOZuPpSgEOX2hdAahxC01sfs1Ed19af+cYAcbHnX2igWZEJq5AxSP4Xr9t\nqDE+3zmWawKBgGKUp4uFjxJ1/mZ309VhS8rMzzGJYgpxFf8rXgVvvwrelrCuV3xv\nUAvbjwQ+igLVhHCZWz/c0UIjnZWEqxlAwLC3hguMmhScJ3pxm2Mx+WJAV6Kxo9uK\n2uE66NyaORdnQgin+TBB9u0Ae8f0AaxOyuDiutE4V8i+jO2a9Dopv4rNAoGBAI8k\nHrwASZHtyHajjTpmKq9cDnOvCAy5NyCPOSLbORYppUWOSBB1ZisKAWSlz/2Ct0AC\nFCKGgaseaF7DasIydXeE8YjSjvkpGvpLGQfaL0JUObAFhsUIcV903PK+Li3nrf0H\nO8V6bc9F54ipAnVs7W7ai4WozDNVGsLCf6Io3KobAoGAFyHiV+t3+O+GOyEi78Jk\ndXMpRP0kjA+vW6jRKyfRM6GaY1dvJEsRF2KrecLyIiE31VrBTmdbYSJkt0uBUmD8\nKGmnJUoWPcxGX21DmQ/W39BjiMqvljXvFaRY2+M4G5La1K/vZ/osi48A7tzP0R1q\nI5CdVd4OWZ+IO334UZHyDL0=\n-----END PRIVATE KEY-----\n`,
  clientEmail: 'firebase-adminsdk-evksu@mern-stack-7d963.iam.gserviceaccount.com',
  clientId: '105862456370708056956',
  authUri: 'https://accounts.google.com/o/oauth2/auth',
  tokenUri: 'https://oauth2.googleapis.com/token',
  authProviderX509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
  clientX509CertUrl: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-evksu%40mern-stack-7d963.iam.gserviceaccount.com',
};

// Initialize Firebase
const app = initializeApp({
  credential: cert(firebaseConfig),
  storageBucket: `${firebaseConfig.projectId}.appspot.com`,
});

const storage = getStorage(app);

export { storage };
