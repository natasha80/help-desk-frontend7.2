/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable eol-last */
import TicketManager from './frontend/TicketManager';

const ticketManager = new TicketManager('.helpdesk__wrapper');
ticketManager.bindToDOM();