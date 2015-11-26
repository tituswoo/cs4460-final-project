'use strict';

let scales = {
  standardScale: [
    {
      from: 0, to: 40,
      remark: 'Low',
      icon: 'fa-frown-o'
    },
    {
      from: 40, to: 60,
      remark: 'Moderate',
      icon: 'fa-meh-o'
    },
    {
      from: 60, to: 80,
      remark: 'High',
      icon: 'fa-smile-o'
    },
    {
      from: 80, to: 100,
      remark: 'Very high',
      icon: 'fa-smile-o'
    }
  ],
  pollutionScale: [
    {
      from: 0, to: 40,
      remark: 'Low',
      icon: 'fa-smile-o'
    },
    {
      from: 40, to: 60,
      remark: 'Moderate',
      icon: 'fa-meh-o'
    },
    {
      from: 60, to: 80,
      remark: 'High',
      icon: 'fa-frown-o'
    },
    {
      from: 80, to: 100,
      remark: 'Very high',
      icon: 'fa-frown-o'
    }
  ],
  healthCare: [
    {
      from: 0, to: 40,
      remark: 'Really bad',
      icon: 'fa-frown-o'
    },
    {
      from: 40, to: 60,
      remark: 'Average',
      icon: 'fa-meh-o'
    },
    {
      from: 60, to: 80,
      remark: 'Great',
      icon: 'fa-smile-o'
    },
    {
      from: 80, to: 100,
      remark: 'Awesome',
      icon: 'fa-smile-o'
    }
  ],
  qualityOfLife: [
    {
      from: 0, to: 35,
      remark: 'Very low',
      icon: 'fa-frown-o'
    },
    {
      from: 35, to: 65,
      remark: 'Low',
      icon: 'fa-frown-o'
    },
    {
      from: 65, to: 100,
      remark: 'Medium',
      icon: 'fa-meh-o'
    },
    {
      from: 100, to: 135,
      remark: 'High',
      icon: 'fa-smile-o'
    },
    {
      from: 135, to: 200,
      remark: 'Very high',
      icon: 'fa-smile-o'
    }
  ],
  costOfLiving: [
    {
      from: 0, to: 40,
      remark: 'Very low',
      icon: 'fa-smile-o'
    },
    {
      from: 40, to: 65,
      remark: 'Low',
      icon: 'fa-smile-o'
    },
    {
      from: 65, to: 80,
      remark: 'Moderate',
      icon: 'fa-meh-o'
    },
    {
      from: 80, to: 110,
      remark: 'High',
      icon: 'fa-frown-o'
    },
    {
      from: 110, to: 1000,
      remark: 'Very high',
      icon: 'fa-frown-o'
    }
  ]
};

export default scales;
