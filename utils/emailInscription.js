const emailTemplates = {
  email_inscription: (
    prenom_etudiant,
    nom_etudiant,
    code_etudiant,
    pwd_etudiant,
    cin_etudiant,
    date
  ) =>
    `
      <!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirmation d'inscription</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f8f8f8;
        font-family: Arial, sans-serif;
      }
      table {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-collapse: collapse;
        border: 1px solid #e0e0e0;
      }
      td {
        padding: 20px;
        text-align: left;
        font-size: 14px;
        line-height: 1.5;
        color: #333333;
      }
      h2, h3, h5 {
        margin: 0;
        color: #333333;
      }
      h2 {
        font-size: 24px;
        text-align: center;
      }
      a {
        color: #007bff;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      .header {
        text-align: center;
        padding: 20px 0;
        background-color: #f0f0f0;
      }
      .header img {
        max-height: 50px;
      }
      .footer {
        font-size: 12px;
        text-align: center;
        color: #777777;
        padding: 20px 0;
        background-color: #f0f0f0;
      }
    </style>
  </head>
  <body>
    <table>
      <tr>
  <td class="header">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="text-align: left; vertical-align: middle; width: 20%;">
          <img src="https://api.university.smartschools.tn/files/logo/logo.png" alt="Logo" style="max-height: 50px;" />
        </td>
        <td style="text-align: center; vertical-align: middle; width: 60%;">
          <h2 style="margin: 0;">Confirmation d'inscription</h2>
        </td>
        <td style="text-align: right; vertical-align: middle; width: 20%;">
          <p style="margin: 0; color: #666; font-size: 12px;">` +
    date +
    `</p>
        </td>
      </tr>
    </table>
  </td>
</tr>
      <tr>
        <td>
          <h5>Bonjour ` +
    prenom_etudiant +
    " " +
    nom_etudiant +
    `,</h5>
          <p>
            Nous avons le plaisir de vous informer que votre inscription a été
            effectuée avec succès. Vous êtes désormais officiellement inscrit et
            pouvez accéder à votre compte via notre application mobile.
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <h3>Téléchargez notre application mobile</h3>
          <p>
            <a href="https://play.google.com">Lien Google Store</a><br />
            <a href="https://apps.apple.com">Lien App Store</a><br />
            <a href="https://example.com/app.apk">Lien APK</a>
          </p>
          <h3>Ouvrez l'application et cliquez sur « Connexion »</h3>
          <p>
            <strong>Entrez votre C.I.N :</strong> ` +
    cin_etudiant +
    `<br />
            <strong>Entrez votre mot de passe :</strong> ` +
    pwd_etudiant +
    `<br />
            <strong>Entrez votre code d'accès :</strong> ` +
    code_etudiant +
    `
          </p>
          <img src="https://api.university.smartschools.tn/files/logo/student-app-login-screen.png" alt="Aperçu de l'application" style="max-width: 100%; height: auto;" />
        </td>
      </tr>
      <tr>
        <td class="footer">
          Si vous rencontrez des problèmes ou si vous avez besoin d'aide, contactez-nous à
          <a href="mailto:contact@sss.com.tn">contact@sss.com.tn</a> ou au
          <strong>00 (216) 52 910 006</strong>.
          <br />
          Cordialement,<br />
          <a href="https://sss.com.tn/">
        </td>
      </tr>
    </table>
  </body>
</html>
      `,
};

module.exports = {
  emailTemplates,
};
