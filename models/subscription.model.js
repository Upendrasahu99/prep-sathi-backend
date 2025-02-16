import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subscription name is required"],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  price: {
    type: Number,
    required: [true, "Subscription price is required"],
    min: [0, "Subscription price must be greater than 0"],
  },
  frequency: {
    type: String,
    required: [true, "Subscription frequency is required"],
    enum: ["daily", "weekly", "monthly", "yearly"],
  },
  category: {
    type: String,
    required: [true, "Subscription category is required"],
    enum: ["education", "entertainment", "health", "other"],
  },
  paymentMethod: {
    type: String,
    required: [true, "Payment method is required"],
    trim: true,
    enum: ["credit_card", "debit_card", "paypal", "bank_transfer"],
  },
  status: {
    type: String,
    required: [true, "Subscription status is required"],
    enum: ["active", "inactive", "cancelled", "expired"],
    default: "active",
  }, 
  startDate: {
    type: Date,
    required: [true, "Subscription start date is required"],
    validate: {
      validator: function(value) {
        return value < this.endDate;
      },
      message: "Start date must be before end date",
    },
  },
  renewalDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: "Renewal date must be after start date",
    },
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
    index: true,
  },
},{timestamps: true});

//Auto-calulate renewal date if missing
subscriptionSchema.pre("save", function(next){
  if(!this.renewalDate ){
    const renewalPeriods= {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    //start date Jan 1st
    //Frequency is monthly Renewal date is Jan 31st
    //Frequency is weekly Renewal date is Jan 7th
    //Frequency is daily Renewal date is Jan 2nd
    //Frequency is yearly Renewal date is Jan 1st

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  // Auto-update the status if renewal date is passed
  if(this.renewalDate < new Date()){
    this.status = "expired";
  }
  next();
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
