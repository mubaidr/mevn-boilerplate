const { Ticket } = require('../models/ticket')
const { response } = require('../classes')
const { middlewares: { tickets: STRINGS } = {} } = require('../MAGIC_STRINGS')
const { Types } = require('mongoose')

exports.getTicket = async (req, res, next) => {
  try {
    let _id, customer, ticket

    if (res?.user?._id) {
      customer = res.user._id
    }

    if (req?.params?.id) {
      _id = req.params.id
    }

    if (Types.ObjectId.isValid(_id) && Types.ObjectId.isValid(customer)) {
      ticket = await Ticket.findOne({ _id, customer }, { __v: 0, customer: 0, comments: 0 })
        .populate({
          path: 'status',
          select: 'name'
        })
        .populate({
          path: 'priority',
          select: 'name'
        })
        .populate({
          path: 'customer',
          select: 'username'
        })
        .populate({
          path: 'lastUpdatedBy',
          select: 'username'
        })
    }

    if (!ticket) {
      response.failed(res, STRINGS.canNotFindTicket)
    } else {
      res.ticket = ticket
      next()
    }
  } catch (err) {
    next(new response.fail())
  }
}
