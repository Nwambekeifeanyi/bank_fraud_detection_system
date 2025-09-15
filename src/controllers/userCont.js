import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import Admin from "../models/admin.js";
import Transaction from "../models/transaction.js";
import Notification from "../models/notification.js";
import Alert from "../models/alert.js";
import Login_attempt from "../models/login_attempt.js";



import { regDate, time } from "../middlewares/date.js";

const userCont = {
  getDashboard: async (req, res) => {
    const user_id = req.user;
    const this_user = await User.findOne({ _id: user_id });

    if (!this_user) {
      res.redirect('/auth/user-logout')
      
    }

      const transactions = await Transaction.find({$or:[{user: user_id}, {recipient: user_id}]}).sort({ _id: -1 }).limit(9).populate('user').populate('recipient');

    const context = { 
       page: 'dashboard',
      this_user,
      transactions,
     };
    return res.render("./userViews/dashboard", { context });
  },

  getTransaction: async (req, res) => {
    const user_id = req.user;
    const this_user = await User.findOne({ _id: user_id });


    let q= req.query.q
    let transactions, transaction_type

   
    if (q) {
      if (q == 'deposit' || q == 'withdrawal' || q == 'transfer') {

        transactions = await Transaction.find({$or:[{user: user_id}, {recipient: user_id}], transaction_type: q}).sort({ _id: -1 }).populate('user').populate('recipient');
        transaction_type = q
      }else{
        transactions = await Transaction.find({$or:[{user: user_id}, {recipient: user_id}]}).sort({ _id: -1 }).populate('user').populate('recipient');
        transaction_type = 'transactions'
      }
    }else{
      transactions = await Transaction.find({$or:[{user: user_id}, {recipient: user_id}]}).sort({ _id: -1 }).populate('user').populate('recipient');
        transaction_type = 'transactions'
    }


    const context = { 
       page: 'transactions',
      transaction_type,
      this_user,
       transactions,
     };
    return res.render("./userViews/transactions", { context });
  },

   getTransactionReceipt: async (req, res) => {
    const this_user_id = req.user;
    const this_user = await User.findOne({ _id: this_user_id });
  
    const {id} = req.params
    
        const transaction = await Transaction.findById(id).populate('user').populate('recipient')
        console.log(transaction);

    const context = { 
      page: 'payment receipt',
      this_user,
      transaction,
     };
    return res.render("./userViews/receipt", { context });
  },

  getNotifications: async (req, res) => {
    const user_id = req.user;
    const this_user = await User.findOne({ _id: user_id });

    const notifications = await Notification.find({user: user_id}).sort({_id: -1}).populate('user')
    
    const context = { 
      page: 'Notifications',
      this_user,
      notifications,
     };
    return res.render("./userViews/notifications", { context });
  },


  getAlerts: async (req, res) => {
    const user_id = req.user;
    const this_user = await User.findOne({ _id: user_id });

    const alerts = await Alert.find({user: user_id}).sort({_id: -1}).populate('user')
    
    const context = { 
      page: 'Fraud Alert',
      this_user,
      alerts,
     };
    return res.render("./userViews/alerts", { context });
  },

  getLoginAttempts: async (req, res) => {
    const user_id = req.user;
    const this_user = await User.findOne({ _id: user_id });

    const login_attempts = await Login_attempt.find({user: user_id}).sort({_id: -1}).populate('user')

    const context = { 
      page: 'login attempts',
      this_user,
      login_attempts,
    };
    return res.render("./userViews/login_attempts", { context });
  },

  getProfile: async (req, res) => {
    const this_user_id = req.user;
    const this_user = await User.findOne({ _id: this_user_id });


    const context = { 
      page: 'profile',
      this_user
     };
    return res.render("./userViews/profile", { context });
  },

  getSetPin: async (req, res) => {
    const this_user_id = req.user;
    const this_user = await User.findOne({ _id: this_user_id });

    const context = { 
      page: 'set PIN',
      this_user
     };
    return res.render("./userViews/set_pin", { context });
  },

  postSetPin: async (req, res) => {
     try {
      const {  old_pin, new_pin, comfirm_pin, } = req.body;

      const user_id = req.user;
      const this_user = await User.findOne({ _id: user_id });


      const pinRegex = /^[0-9]+$/;
      if (this_user.pin) {
        console.log(this_user.pin);
        
         if (!pinRegex.test(old_pin)) throw Error("enter a valid old PIN");

          let isPasswordMatch = old_pin === this_user.pin
      
      if (!isPasswordMatch) throw Error("incorrect old PIN");

        //  if (new_pin.length > 4) throw Error("enter a 4 digits new PIN");
        }


        if (new_pin.length > 4) throw Error("enter a 4 digits new PIN");
        if (comfirm_pin.length > 4) throw Error("enter a 4 digits new PIN");


     
      

      const updatedAccount = await User.findOneAndUpdate(
        { _id: this_user._id },
        {
          pin: new_pin
        }
      );

    
      return res
        .status(200)
        .json({
          success: "PIN successfully set",
          user: updatedAccount,
        });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

getTransfer: async (req, res) => {
    const this_user_id = req.user;
    const this_user = await User.findOne({ _id: this_user_id });

    const context = { 
      page: 'make transafer',
      this_user
     };
    return res.render("./userViews/transfer", { context });
},


 postTransfer: async (req, res) => {
     try {
      const {  account_number,
      amount,
      pin, } = req.body;

      // sender
      const user_id = req.user;
      const this_user = await User.findOne({ _id: user_id });

      console.log(this_user.balance);
      console.log(amount);
      

      // recipient
      const account = await User.findOne({account_number: account_number})

      const deviceName = req.headers['user-agent']


      


        // throw new Error()
      
      if (pin !== this_user.pin) {
        const notification = await Notification.create({
          user: user_id,
          sender_message: `An incorrect PIN was entered on your account from device ${deviceName} at ${regDate}|${time}. If this was not you, please secure your account immediately.`,
          regDate: `${regDate}|${time}`,
        });


            const alert = await Alert.create({
              user: user_id,
              alert_type: 'security',
              message: `A failed transaction attempt occurred due to an incorrect PIN entry from device ${deviceName} at ${regDate}|${time}. If you did not perform this action, change your PIN immediately and contact support.`,
              regDate: `${regDate}|${time}`,
            });

             throw new Error('incorrect transaction PIN')
      }


      if (!account){
            const transaction = await Transaction.create({
              user: user_id,
              amount,
              transaction_type: "transfer",
              status: "failed",
              reason: "invalid account",
              regDate: `${regDate}|${time}`,
            });


            const notification = await Notification.create({
              user: user_id,
              transaction: transaction._id,
              message: `Your payment could not be processed because the destination account does not exist. For your security, the transaction has been blocked.`,
              regDate: `${regDate}|${time}`,
            });


            const alert = await Alert.create({
              user: user_id,
              transaction: transaction._id,
              alert_type: 'fraud',
              message: `⚠️ Alert! A payment attempt was made to a non-existent account. For your security, this transaction has been blocked. If you did not initiate this action, please contact our support team immediately.`,
              regDate: `${regDate}|${time}`,
            });


            throw new Error('Transaction failed')

      }  
      
      
      if (parseInt(this_user.balance) < parseInt(amount)) {
           const transaction = await Transaction.create({
              user: user_id,
              amount,
              transaction_type: "transfer",
              status: "failed",
              reason: "insufficient balance",
              regDate: `${regDate}|${time}`,
            });


            const notification = await Notification.create({
              user: user_id,
              transaction: transaction._id,
              message: `Transaction declined ❌. Your balance is insufficient to complete this request. Please fund your account and try again.`,
              regDate: `${regDate}|${time}`,
            });


            const alert = await Alert.create({
              user: user_id,
              transaction: transaction._id,
              alert_type: 'fraud',
              message: `⚠️ Alert! We noticed an unusual attempt to withdraw ₦${parseFloat(amount).toFixed(2)} from your account. If this wasn’t you, please contact customer support immediately.`,
              regDate: `${regDate}|${time}`,
            });

            throw new Error('Insufficient balance')

      }

       const transaction = await Transaction.create({
              user: user_id,
              recipient: account._id,
              amount,
              transaction_type: "transfer",
              status: "successful",
              regDate: `${regDate}|${time}`,
            });


      if (transaction) {
              
        let sender_balance = String((parseFloat(this_user.balance) - parseFloat(amount)).toFixed(2))
        let sender_out_flow = String((parseFloat(this_user.out_flow) + parseFloat(amount)).toFixed(2))
        
        let recipient_balance = String((parseFloat(account.balance) + parseFloat(amount)).toFixed(2))
        let recipient_in_flow = String((parseFloat(account.in_flow) + parseFloat(amount)).toFixed(2))

        const updatedSender = await User.findOneAndUpdate({_id: user_id}, 
          {balance: sender_balance, out_flow: sender_out_flow}
        ) //update sender

        const updatedRecipient = await User.findOneAndUpdate({_id: account._id}, 
          {balance: recipient_balance, in_flow: recipient_in_flow}
        ) //update sender

        console.log(updatedRecipient);
        console.log(updatedSender);
        

              const notification = await Notification.create({
                user: user_id,
                recipient: account._id,
                transaction: transaction._id,
                sender_message: `You’ve successfully sent ₦${parseFloat(amount).toFixed(2)}. We truly appreciate your trust in us to keep your transactions safe and smooth.`,
                recipient_message: `We’re delighted to inform you that ₦${parseFloat(amount).toFixed(2)} has been successfully credited to your account. Thank you for banking with us, your trust means everything.`,
                regDate: `${regDate}|${time}`,
              });
            }
      // throw new Error()
     

      return res
        .status(200)
        .json({
          success: 'transaction successful',
          transaction: transaction,
        });
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({ error: error.message });
    }
},

 verifyAccount: async (req, res) => {
     try {
      const {   account_number,
      amount,
      pin, } = req.body;

      const user_id = req.user;
      const this_user = await User.findOne({ _id: user_id });

      console.log(req.body);

       if (account_number == this_user.account_number) throw new Error("You cannot transfer to your account")

      const account = await User.findOne({account_number: account_number})

     

      console.log(account);
      
      

     
      return res
        .status(200)
        .json({
          user: account,
        });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
},
};

export default userCont;
