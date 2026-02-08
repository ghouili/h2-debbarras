# React/Vite UI Prompt (Contact + Devis)

```json
{
  "promptType": "react-vite-ui-spec",
  "sourceProject": "Débarras Aurea Next.js (contact + devis)",
  "brand": "Débarras Aurea",
  "forms": [
    {
      "id": "contact_form",
      "title": "Contact",
      "submitEndpoint": "/api/leads",
      "payload": {
        "source": "contact_form",
        "name": "string",
        "phone": "string",
        "postalCode": "string",
        "requestType": "string",
        "message": "string",
        "consent": "boolean"
      },
      "fields": [
        {
          "name": "name",
          "label": "Nom complet",
          "type": "text",
          "placeholder": "Jean Dupont",
          "required": true,
          "validation": "minLength 2",
          "errorMessage": "Veuillez entrer votre nom"
        },
        {
          "name": "phone",
          "label": "Téléphone",
          "type": "tel",
          "placeholder": "06 12 34 56 78",
          "required": true,
          "validation": "FR phone: /^(0[1-9]\\d{8}|\\[1-9]\\d{8})$/ after removing spaces",
          "errorMessage": "Numéro de téléphone invalide"
        },
        {
          "name": "postalCode",
          "label": "Code postal",
          "type": "text",
          "placeholder": "75001",
          "required": false,
          "validation": "If provided, must be Île-de-France: /^(75|77|78|91|92|93|94|95)\\d{3}$/",
          "errorMessage": "Code postal Île-de-France requis (ex: 75001)"
        },
        {
          "name": "requestType",
          "label": "Type de demande",
          "type": "select",
          "required": false,
          "default": "devis",
          "options": [
            { "value": "devis", "label": "Demande de devis" },
            { "value": "information", "label": "Demande d'information" },
            { "value": "rendez-vous", "label": "Prise de rendez-vous" },
            { "value": "autre", "label": "Autre demande" }
          ]
        },
        {
          "name": "message",
          "label": "Message",
          "type": "textarea",
          "placeholder": "Décrivez votre besoin...",
          "required": false,
          "rows": 4
        },
        {
          "name": "consent",
          "label": "J'accepte d'être contacté(e) par Débarras Aurea pour ma demande.",
          "type": "checkbox",
          "required": true,
          "errorMessage": "Veuillez accepter le traitement de vos données",
          "link": { "label": "Politique de confidentialité", "href": "/politique-confidentialite" }
        }
      ],
      "ui": {
        "submitLabel": "Envoyer",
        "successState": {
          "title": "Message envoyé !",
          "body": "Nous avons bien reçu votre message et vous répondrons sous 2 heures maximum.",
          "nextSteps": [
            "Nous analysons votre demande",
            "Un conseiller vous rappelle sous 2h",
            "Vous recevez votre devis gratuit"
          ]
        }
      }
    },
    {
      "id": "quote_form",
      "title": "Demande de devis",
      "submitEndpoint": "/api/leads",
      "payload": {
        "service": "string",
        "postalCode": "string",
        "city": "string",
        "timing": "string",
        "localType": "string",
        "propertyType": "string",
        "rooms": "string",
        "volume": "string",
        "volumeEstimate": "string",
        "floor": "string",
        "elevator": "boolean",
        "photos": "File[]",
        "message": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "phone": "string",
        "consent": "boolean"
      },
      "fields": [
        {
          "name": "service",
          "label": "Type de service",
          "type": "radio-cards",
          "required": true,
          "options": [
            "debarras-maison",
            "debarras-appartement",
            "cave-grenier",
            "encombrants",
            "commerces-entrepots",
            "bureaux-locaux",
            "gravats",
            "demenagement-particulier",
            "demenagement-entreprise"
          ]
        },
        {
          "name": "postalCode",
          "label": "Code postal",
          "type": "text",
          "placeholder": "75001",
          "required": true,
          "inputMode": "numeric",
          "maxLength": 5
        },
        {
          "name": "city",
          "label": "Ville",
          "type": "text",
          "placeholder": "Paris",
          "required": false
        },
        {
          "name": "firstName",
          "label": "Prénom",
          "type": "text",
          "placeholder": "Jean",
          "required": true
        },
        {
          "name": "lastName",
          "label": "Nom",
          "type": "text",
          "placeholder": "Dupont",
          "required": true
        },
        {
          "name": "email",
          "label": "Email",
          "type": "email",
          "placeholder": "jean.dupont@exemple.com",
          "required": true
        },
        {
          "name": "phone",
          "label": "Téléphone",
          "type": "tel",
          "placeholder": "06 12 34 56 78",
          "required": true
        },
        {
          "name": "consent",
          "label": "J'accepte d'être contacté par Débarras Aurea concernant ma demande de devis.",
          "type": "checkbox",
          "required": true
        }
      ],
      "ui": {
        "submitLabel": "Recevoir mon devis gratuit",
        "reassurance": "Réponse sous 2h • Devis gratuit, sans engagement",
        "successState": "SuccessState component"
      }
    }
  ]
}
```
