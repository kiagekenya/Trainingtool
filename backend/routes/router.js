const express = require('express');
const router = express.Router()
const schemas = require('../models/schemas')
const bcrypt = require('bcrypt');



router.post('/employee', async (req, res) => {
  const { staffNumber } = req.body;

  const employeesData = {staffNumber:staffNumber}
    const newEmployees = new schemas.Employees(employeesData)

  try {
    const companyEmployee = await schemas.CompanyEmployees.findOne({ staffNumber: staffNumber });

    if (!companyEmployee) {
      return res.status(404).json('Employee not found in the company database');
    }

    const saveEmployees = await newEmployees.save()
    if (saveEmployees) {
      res.send(`Hey, checkIn for staff number ${staffNumber} recorded. Good day`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});


router.get('/employee/:staffNumber', async (req, res) => {
  const { staffNumber } = req.params;

  try {
    
    const employees = await schemas.Employees.find({ staffNumber: staffNumber });

    if (employees.length > 0) {
      
      let name = '';
      const employeeData = [];

      
      for (const employee of employees) {
        
        const companyEmployee = await schemas.CompanyEmployees.findOne({ staffNumber: staffNumber });

        if (companyEmployee) {
          name = companyEmployee.name;
        } else {
          name = 'Name not found'; 
        }

        
        const employeeDetails = {
          staffNumber: staffNumber,
          checkInDate: employee.checkInDate,
          checkOutDate: employee.checkOutDate,
          name: name,
        };

        employeeData.push(employeeDetails);
      }

      res.json(employeeData);
    } else {
      res.status(404).json('No employees found with the given staff number');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});


  
 

  router.post('/employee/checkout', async (req, res) => {
    const { staffNumberOut } = req.body;
  
    try {
      
      const mostRecentCheckIn = await schemas.Employees.findOne({ staffNumber: staffNumberOut, checkOutDate: null })
        .sort({ checkInDate: -1 }) 
        .exec();
  
      if (mostRecentCheckIn) {
        
        mostRecentCheckIn.checkOutDate = new Date();
        await mostRecentCheckIn.save();
        res.send(`Hey, checkOut for staff number ${staffNumberOut} recorded. Have a nice day!`);
      } else {
        res.status(404).json('No active check-in found for the given staff number');
      }
    } catch (error) {
      res.status(500).json('Internal server error');
    }
  });




  router.post('/api/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      
      const user = await schemas.User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const newUser = new schemas.User({ name, email, password: hashedPassword });
      await newUser.save();
  
      
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  router.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('Request body:', req.body);
  
      const user = await schemas.User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      
      console.log('Login successful');
      res.json({ redirectUrl: '/report' });
     
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


 
router.get('/api/recent-activities', async (req, res) => {
  try {
    const selectedDate = req.query.date;

    
    const recentActivities = await schemas.Employees.find({
      checkInDate: {
        $gte: new Date(selectedDate), 
        $lt: new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1)), 
      },
    });

    res.json(recentActivities);
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    res.status(500).json('Internal server error');
  }
});





router.get('/api/get-names-departments', async (req, res) => {
  const staffNumbersParam = req.query.staffNumbers;

  
  const staffNumbers = staffNumbersParam.split(',');

  try {
    
    const namesDepartments = await schemas.CompanyEmployees.find(
      { staffNumber: { $in: staffNumbers } },
      'staffNumber name department'
    );

    if (namesDepartments.length > 0) {
      
      res.json(namesDepartments);
    } else {
      res.status(404).json('No names and departments found for the given staff numbers');
    }
  } catch (error) {
    console.error('Error fetching names and departments:', error);
    res.status(500).json('Internal server error');
  }
});

router.get('/api/employees', async (req, res) => {
  try {
    
    const employees = await schemas.CompanyEmployees.find({}, 'name staffNumber department');

    if (employees.length > 0) {
      
      res.json(employees);
    } else {
      res.status(404).json('No employee details found');
    }
  } catch (error) {
    console.error('Error fetching employee details:', error);
    res.status(500).json('Internal server error');
  }
});

  
  
  
  
  
  
  
  





module.exports = router






