/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
import Request from './Request';
import Popup from './Popup';
import Ticket from './Ticket';

export default class TicketManager {
  constructor(container) {
    this.container = (typeof container === 'string') ? document.querySelector(container) : container;

    // this.request = new Request('http://localhost:3000/');
    this.request = new Request('https://kira-heroku.herokuapp.com/');
    this.popup = new Popup();
    this.tickets = [];

    this.addTicket = this.addTicket.bind(this);
    this.editTicket = this.editTicket.bind(this);
    this.onChangeTicket = this.onChangeTicket.bind(this);
  }

  bindToDOM() {
    const addBtn = document.querySelector('.helpdesk-control__add');
    addBtn.addEventListener('click', () => {
      this.popup.createPopup();
      this.popup.showPopup(this.addTicket);
    });

    this.showDesk();
  }

  showDesk() {
    const allTickets = this.request.allTickets();

    allTickets.then((resolve) => {
      this.tickets = [];
      this.container.innerHTML = '';

      JSON.parse(resolve).forEach((el) => {
        const ticket = new Ticket(el.id, el.title, el.created, el.status);
        this.tickets.push(ticket);
      });

      this.tickets.forEach((el) => this.container.appendChild(el.ticket));
      this.container.addEventListener('click', this.onChangeTicket);
    });
  }

  addTicket() {
    const description = this.popup.description.value || 'Описания нет';
    const request = this.request.createTicket(this.popup.title.value, description, false);
    this.popup.hidePopup();

    request.then(() => this.showDesk());
  }

  removeTicket(id) {
    this.popup.hidePopup();
    const request = this.request.removeTicket(id);

    request.then(() => this.showDesk());
  }

  onChangeTicket(e) {
    const { target } = e;
    const currentTicket = target.closest('.helpdesk__ticket');
    const ticket = this.tickets.find((el) => el.ticket === currentTicket);

    if (target.classList.contains('helpdesk-ticket__status')) {
      this.changeStatus(ticket.id);
    }

    if (target.classList.contains('ticket-description__text')) {
      target.addEventListener('mousedown', () => false);
      target.addEventListener('selectstart', () => false);

      const completeText = currentTicket.querySelector('.ticket-description__complete-text');
      if (completeText) completeText.remove();
      else this.showDescription(ticket);
    }

    if (target.classList.contains('ticket-control__editing')) {
      if (!ticket.description) {
        const request = this.request.ticketById(ticket.id);

        request.then((resolve) => {
          const { description } = JSON.parse(resolve);
          ticket.description = description;
          this.popup.createPopup();
          this.popup.showPopup(() => this.editTicket(ticket), ticket);
        });
      } else {
        this.popup.createPopup();
        this.popup.showPopup(() => this.editTicket(ticket), ticket);
      }
    }

    if (target.classList.contains('ticket-control__removing')) this.popup.createWarning(() => this.removeTicket(ticket.id));
  }

  changeStatus(id) {
    const request = this.request.changeStatus(id);

    request.then(() => this.showDesk());
  }

  showDescription(elem) {
    const descriptionNode = elem.ticket.querySelector('.helpdesk-ticket__description');

    if (elem.description) {
      const descriptionBlock = document.createElement('div');
      descriptionBlock.classList.add('ticket-description__complete-text');
      descriptionBlock.innerHTML = `<p>${elem.description}</p>`;
      descriptionNode.appendChild(descriptionBlock);
    } else {
      const request = this.request.ticketById(elem.id);

      request.then((resolve) => {
        const descriptionBlock = document.createElement('div');
        descriptionBlock.classList.add('ticket-description__complete-text');
        ({ description: elem.description } = JSON.parse(resolve));
        descriptionBlock.innerHTML = `<p>${elem.description}</p>`;
        descriptionNode.appendChild(descriptionBlock);
      });
    }
  }

  editTicket(elem) {
    const description = this.popup.description.value || 'Описания нет';
    const request = this.request.editTicket(elem.id, this.popup.title.value, description);
    this.popup.hidePopup();

    request.then(() => this.showDesk());
  }
}