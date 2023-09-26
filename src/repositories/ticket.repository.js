export default class TicketRepository {
    constructor(dao){
        this.dao =dao;
    }
    createTicket = (ticket)=>{
        return this.dao.createTicket(ticket);
    }
    
    getTicket = (ticket)=>{
        return this.dao.getTicket(ticket)
    }
}