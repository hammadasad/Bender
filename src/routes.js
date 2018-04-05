// Imports 
import express from 'express';
import { log } from './utils';
import { filesList } from './modules/files';

const router = new express.Router();

// Post from the slack bot when the person says /yo
router.post('/slack/command/yo', async (req, res) => {
  try {
    let reqObj = req.body;
    let response = {
      response_type: 'in_channel',
      // Channel we're sending our response
      channel: reqObj.channel_id,
      text: ':slightly_smiling_face:',
      // Send our attachments for user to select
      attachments: [{
        text: 'What file would you like to get?',
        fallback: 'What file would you like to get?',
        color: '#2c963f',
        attachment_type: 'default',
        // We'll use this later once the user selects a file
        callback_id: 'file_selection',
        // List of actions in the interactive aspect , a select menu
        actions: [{
          name: 'files_select_menu',
          text: 'Choose a file...',
          type: 'select',
          options: filesList,
        }],
      }],
    };
    return res.json(response);
  } catch (err) {
    log.error(err);
    return res.status(500).send('Something went wrong');
  }
});

export default router;
