var fs = require('fs');
var path = require('path');
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../types/users';
import bcrypt from 'bcryptjs';
import signToken from '../../../utils/auth';

// Exported - as NextJS allows Frontend using Backend Functionality
export const buildnewUserPath = () => {
  return path.join(process.cwd(), 'data', 'users.json');
};

export const handlenewUserData = (filePath: String) => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

// @route   POST api/users/login (endpoint)
// @desc    E-Mail und Passwort (hashed) werden mit der data/users.json Datei abgeglichen.
//          Bei korrekten Login Daten wird ein JSON Webtoken und die E-Mail zurückgegeben,
//          ansonsten wird eine entprechende Fehlermeldung übermittelt
//
//          Es wird folgendes POST Object erwartet:
//            {
//              "email": "beispiel@beispiel.com",
//              "password": "clear_text_passwort"
//            }
// @access  Not Protected
function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = buildnewUserPath();
  const data = handlenewUserData(filePath);

  console.log(data);
  const email = req.body.email;
  const password = req.body.password;

  data.map((user: User) => {
    if (
      String(user.email) === String(email) &&
      bcrypt.compareSync(password, user.password)
    ) {
      const token = signToken(user);
      res.send({ token, email: email });
    }
  });

  res.status(401).json({ message: 'Email oder Passwort ist falsch' });
}

export default handler;
