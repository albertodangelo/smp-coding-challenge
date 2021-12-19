var fs = require('fs');
var path = require('path');
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../types/users';
import bcrypt from 'bcryptjs';

// Exported - as NextJS allows Frontend using Backend Functionality
export const buildnewUserPath = () => {
  return path.join(process.cwd(), 'data', 'users.json');
};

export const handlenewUserData = (filePath: String) => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

// @route   POST api/users/newusers (endpoint)
// @desc    E-Mail wird mit der data/users.json Datei abgeglichen.
//          Falls der User bereits existiert, wird eine entsprechende Meldung zurückgegeben.
//          Falls der User nicht exsistiert, wird das Passwort gehashed und der User in der
//          data/users.json Datei gespeichert.
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

  let userExists = false;

  const email = req.body.email;
  const password = req.body.password;

  data.map((user: User) => {
    if (String(user.email) === String(email)) {
      res.status(403).json({
        message: 'Mit dieser E-Mail-Adresse gibt es bereits ein Konto!',
      });
      userExists = true;
    }
  });

  if (userExists === false) {
    const salt = bcrypt.genSaltSync(10);

    const newUser = {
      email: String(email),
      password: bcrypt.hashSync(password, salt),
    };

    data.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(200).json({ message: 'Du wurdest registriert' });
  }
}

export default handler;
