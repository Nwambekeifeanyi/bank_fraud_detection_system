import User from "../models/user.js";
import Admin from "../models/admin.js";
import Transaction from "../models/transaction.js";
import Notification from "../models/notification.js";
import Alert from "../models/alert.js";
import Login_attempt from "../models/login_attempt.js";


import { regDate, time } from "../middlewares/date.js";
// import { Transaction } from "mongodb";

const adminCont = {
  getLogin: async (req, res) => {
    console.log(regDate);

    return res.render("./adminViews/login");
  },
  getRegistration: async (req, res) => {
    return res.render("./adminViews/register");
  },
  getDashboard: async (req, res) => {
    const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    
    if (!admin) {
      res.redirect('/auth/admin-logout')
    }
    // const createdAccounts = await User.updateMany({password: '$2b$10$9bd/2e23O0S65AUJ.dFD6uXxbvq594fH6vLPtqU5Ent5CCgOcS6em'})
    // const createdAccounts = await User.updateMany({password: '$2b$10$/mpmbKeVr0HSONDcOliC4uB//WktQ7m.fmDPbhOzRHXETFDX.mYkq'})
    //     const createdAccounts = await User.insertMany([

    //   {
    //     full_name: "jane smith",
    //     account_number: "10503451502",
    //     email: "janesmith@email.com",
    //     contact: "09023454561",
    //     gender: "female",
    //     password: "09023454561",
    //     regDate: "14 Aug, 2025"
    //   },
    //   {
    //     full_name: "michael brown",
    //     account_number: "10503451503",
    //     email: "michaelbrown@email.com",
    //     contact: "09023454562",
    //     gender: "male",
    //     password: "09023454562",
    //     regDate: "25 Jun, 2025"
    //   },
    //   {
    //     full_name: "sarah johnson",
    //     account_number: "10503451504",
    //     email: "sarahjohnson@email.com",
    //     contact: "09023454563",
    //     gender: "female",
    //     password: "09023454563",
    //     regDate: "08 May, 2025"
    //   },
    //   {
    //     full_name: "peter williams",
    //     account_number: "10503451505",
    //     email: "peterwilliams@email.com",
    //     contact: "09023454564",
    //     gender: "male",
    //     password: "09023454564",
    //     regDate: "19 Mar, 2025"
    //   },
    //   {
    //     full_name: "linda davis",
    //     account_number: "10503451506",
    //     email: "lindadavis@email.com",
    //     contact: "09023454565",
    //     gender: "female",
    //     password: "09023454565",
    //     regDate: "03 Feb, 2025"
    //   },
    //   {
    //     full_name: "david clark",
    //     account_number: "10503451507",
    //     email: "davidclark@email.com",
    //     contact: "09023454566",
    //     gender: "male",
    //     password: "09023454566",
    //     regDate: "27 Jan, 2025"
    //   },
    //   {
    //     full_name: "emma thomas",
    //     account_number: "10503451508",
    //     email: "emmathomas@email.com",
    //     contact: "09023454567",
    //     gender: "female",
    //     password: "09023454567",
    //     regDate: "05 Sep, 2025"
    //   },
    //   {
    //     full_name: "daniel white",
    //     account_number: "10503451509",
    //     email: "danielwhite@email.com",
    //     contact: "09023454568",
    //     gender: "male",
    //     password: "09023454568",
    //     regDate: "11 Nov, 2025"
    //   },
    //   {
    //     full_name: "olivia martin",
    //     account_number: "10503451510",
    //     email: "oliviamartin@email.com",
    //     contact: "09023454569",
    //     gender: "female",
    //     password: "09023454569",
    //     regDate: "29 Oct, 2025"
    //   },
    //   {
    //     full_name: "william lee",
    //     account_number: "10503451511",
    //     email: "williamlee@email.com",
    //     contact: "09023454570",
    //     gender: "male",
    //     password: "09023454570",
    //     regDate: "16 Apr, 2025"
    //   },
    //   {
    //     full_name: "ava hall",
    //     account_number: "10503451512",
    //     email: "avahall@email.com",
    //     contact: "09023454571",
    //     gender: "female",
    //     password: "09023454571",
    //     regDate: "21 May, 2025"
    //   },
    //   {
    //     full_name: "james allen",
    //     account_number: "10503451513",
    //     email: "jamesallen@email.com",
    //     contact: "09023454572",
    //     gender: "male",
    //     password: "09023454572",
    //     regDate: "04 Jun, 2025"
    //   },
    //   {
    //     full_name: "isabella scott",
    //     account_number: "10503451514",
    //     email: "isabellascott@email.com",
    //     contact: "09023454573",
    //     gender: "female",
    //     password: "09023454573",
    //     regDate: "10 Dec, 2025"
    //   },
    //   {
    //     full_name: "henry young",
    //     account_number: "10503451515",
    //     email: "henryyoung@email.com",
    //     contact: "09023454574",
    //     gender: "male",
    //     password: "09023454574",
    //     regDate: "07 Jan, 2025"
    //   }
    // ]);

    const users = await User.find({is_deleted: false})
    const blacklisted = await User.find({is_black_listed: true,is_deleted: false})
    const users_limit = await User.find({is_deleted: false}).limit(7).sort({_id: -1})
    const transactions = await Transaction.find()
    const notifications = await Notification.find()
    const alerts = await Alert.find()
    const login_attempts = await Login_attempt.find()
    const context = {
      page: "Dashboard",
      admin,
      users_limit,
      users,
      blacklisted,
      transactions,
      notifications,
      alerts,
      login_attempts,
      
      // users,
    };

    return res.render("./adminViews/dashboard", { context });
  },

  getAccounts: async (req, res) => {
    const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    if (!admin) {
      res.redirect('/auth/admin-logout')
    }

    // await User.updateMany({is_deleted: false})
    let q = req.query.q
    console.log(q);
    
    let users, page

    if (q) {
      
      if (q == 'true') {
        users = await User.find({is_black_listed: true, is_deleted: false}).sort({ _id: -1 });
        page = 'blacklisted Account'
      }
    }
    else{

      users = await User.find({is_deleted: false}).sort({ _id: -1 });
      page = 'all Accounts'

    }



    const context = {
      page,
      admin,
      
      users,
    };

    return res.render("./adminViews/accounts", { context });
  },

  getAccountDetails: async (req, res) => {
     const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    if (!admin) {
      res.redirect('/auth/admin-logout')
    }

    let user_id = req.params.id;
    const this_user = await User.findOne({ _id: user_id });

      const transactions = await Transaction.find({$or:[{user: user_id}, {recipient: user_id}]}).sort({ _id: -1 }).populate('user').populate('recipient');
    const notifications = await Notification.find({$or:[{user: user_id}, {recipient: user_id}]}).sort({_id: -1}).populate('user')
    const login_attempts = await Login_attempt.find({user: user_id}).sort({_id: -1}).populate('user')
   
    const alerts = await Alert.find({user: user_id}).sort({_id: -1}).populate('user')
      const userAgent = req.headers['user-agent']


    const context = {
      page: `Account Details - ${this_user.full_name}`,
      this_user,
      transactions,
      notifications,
      alerts,
      login_attempts,
      admin,
    };

    return res.render("./adminViews/account_details", { context });
  },
  getAddAccount: async (req, res) => {
     const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    if (!admin) {
      res.redirect('/auth/admin-logout')
    }

    const users = await User.find();

    const context = {
      page: "Add Account",
      admin,
      
      // users,
    };

    return res.render("./adminViews/add_account", { context });
  },

  postAddAccount: async (req, res) => {
    try {
      const { full_name, email, contact, gender } = req.body;

      const alreadyRegistered = await User.findOne({ email: email });

      if (alreadyRegistered) {
        throw new Error("This email is already registered");
      }
      // account number
      let random = Math.floor(Math.random() * 1000000000000 + 1000000000000);
      let num = String(random).slice(0, 10);
      const account_number = num;

      console.log(account_number);

      const createdAccount = await User.create({
        full_name,
        email,
        contact,
        gender,
        password: "user",
        regDate,
        account_number,
      });

      // 		+
      console.log(req.body);

      return res
        .status(200)
        .json({
          success: "Account successfully created",
          user: createdAccount,
        });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getUpdateAccount: async (req, res) => {
    const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    if (!admin) {
      res.redirect('/auth/admin-logout')
    }

    let user_id = req.params.id;
    const this_user = await User.findOne({ _id: user_id });

    const users = await User.find();

    const context = {
      page: "Update Account",
      this_user,
      admin,
      
      // users,
    };

    return res.render("./adminViews/update_account", { context });
  },

  postUpdateAccount: async (req, res) => {
        try {
          const { full_name, email, contact, gender, amount, id } = req.body;

          // console.log(req.body);

          const this_user = await User.findOne({ _id: id });

          if (!this_user) throw new Error("User not found");

          let balance, in_flow;

          if (amount) {
            balance = parseFloat(
              parseFloat(this_user.balance) + parseFloat(amount)
            ).toFixed(2);
            in_flow = parseFloat(
              parseFloat(this_user.in_flow) + parseFloat(amount)
            ).toFixed(2);
          }
          // else{
          //   balance = this_user.balance
          //   in_flow = this_user.in_flow
          // }

          // console.log('bbb ', balance);
          // console.log('fffff ', in_flow);

          // throw new Error("corrct")
          const updatedAccount = await User.findOneAndUpdate(
            { _id: id },
            {
              full_name,
              email,
              contact,
              gender,
              balance,
              in_flow,
            }
          );

          if (amount && updatedAccount) {
            const transaction = await Transaction.create({
              user: id,
              recipient: id,
              amount,
              transaction_type: "deposit",
              status: "successful",
              regDate: `${regDate}|${time}`,
            });

            const notification = await Notification.create({
              user: id,
              message: `Your deposite of ₦${parseFloat(amount).toFixed(
                2
              )} has been successfully credited into your account. Thanks for banking with us.`,
              regDate: `${regDate}|${time}`,
            });
          }

          // 		+

          return res
            .status(200)
            .json({
              success: "Account successfully updated",
              user: updatedAccount,
            });
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
  },
  alterComponents: async (req, res) => {
    try {
      const { id, component, action } = req.body;

      console.log(req.body);

      let message;
      let deleted

      if (id && component && action) {
      const this_user = await User.findOne({ _id: id });
        
        if (component == 'user') {


          if (action == 'block') {
            if (this_user.is_blocked) {
              await User.findOneAndUpdate({_id: id}, {is_blocked: false})
              const notification = await Notification.create({
              user: id,
              message: 'Your account has been temporarily blocked due to unusual activity. Please contact our support team immediately to verify your identity and restore access.',
        });
              message = "Account successfully unblocked"
            }else{
              await User.findOneAndUpdate({_id: id}, {is_blocked: true})
              const notification = await Notification.create({
              user: id,
              message: 'Good news! Your account has been successfully unblocked. You can now log in and continue using our services. Please ensure your security details are up to date.',
        });
              message = "Account successfully blocked"

            }
          }



          if (action == 'blacklist') {
            if (this_user.is_black_listed) {
              await User.findOneAndUpdate({_id: id}, {is_black_listed: false})
              const notification = await Notification.create({
              user: id,
              message: 'Your account has been permanently blacklisted due to repeated violations of our terms of service. You will no longer be able to access our platform or create a new account. For inquiries, contact support immediately.',
              regDate: `${regDate}|${time}`,
        });
              message = "Account successfully whitelisted"
            }else{
              await User.findOneAndUpdate({_id: id}, {is_black_listed: true})
              const notification = await Notification.create({
              user: id,
              message: 'Good news! Your account has been whitelisted. You now have full access to all platform features without restrictions. Thank you for maintaining compliance with our policies.',
              regDate: `${regDate}|${time}`,
        });
              message = "Account successfully blacklisted"

            }
          }


          if (action == 'delete') {

            
              await User.findOneAndUpdate({_id: id}, {is_deleted: true})
           deleted = true
              message = "Account successfully deleted"

          }
        }
      }

      

      return res
        .status(200)
        .json({
          success: message,
          is_deleted: deleted
        });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },


  getTransactions: async (req, res) => {
     const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    if (!admin) {
      res.redirect('/auth/admin-logout')
    }
   
    let q= req.query.q
    let transactions, transaction_type

   
    if (q) {
      if (q == 'deposit' || q == 'withdrawal' || q == 'transfer') {

        transactions = await Transaction.find({transaction_type: q}).sort({ _id: -1 }).populate('user').populate('recipient');
        transaction_type = q
      }else{
        transactions = await Transaction.find().sort({ _id: -1 }).populate('user').populate('recipient');
        transaction_type = 'transactions'
      }
    }else{
      transactions = await Transaction.find().sort({ _id: -1 }).populate('user').populate('recipient');
        transaction_type = 'transactions'
    }

    console.log(transactions);
    

    const context = {
      page: 'transactions',
      transaction_type,
      admin,
      
      transactions,
    };

    return res.render("./adminViews/transactions", { context });
  },
  getTransactionReceipt: async (req, res) => {
     const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    if (!admin) {
      res.redirect('/auth/admin-logout')
    }
   
    const {id} = req.params

    const transaction = await Transaction.findById(id).populate('user').populate('recipient')
    console.log(transaction);
    
    const context = {
      page: 'Receipt',
      admin,
      
      transaction,
    };

    return res.render("./adminViews/receipt", { context });
  },


  getNotifications: async (req, res) => {
     const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    if (!admin) {
      res.redirect('/auth/admin-logout')
    }

   
    const notifications = await Notification.find().sort({_id: -1}).populate('user')

    const context = {
      page: 'Notifications',
      notifications,
      admin,
    };

    return res.render("./adminViews/notification", { context });
  },
  getAlerts: async (req, res) => {
     const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    if (!admin) {
      res.redirect('/auth/admin-logout')
    }

   
    const alerts = await Alert.find().sort({_id: -1}).populate('user')

    const context = {
      page: 'Fraud Alerts',
      alerts,
      admin,
    };

    return res.render("./adminViews/alert", { context });
  },
  getLoginAttempts: async (req, res) => {
     const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    if (!admin) {
      res.redirect('/auth/admin-logout')
    }

   
      const login_attempts = await Login_attempt.find().sort({_id: -1}).populate('user')


    const context = {
      page: 'Login attempts',
      login_attempts,
      admin,
    };

    return res.render("./adminViews/login_attempt", { context });
  },
};

export default adminCont;
