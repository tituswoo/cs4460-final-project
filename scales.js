'use strict';

let scales = {
  standardScale: [
    {
      from: 0, to: 40,
      remark: 'Low',
      icon: 'fa-frown-o',
      className: 'bkg--red',
      sortOrder: 2
    },
    {
      from: 40, to: 60,
      remark: 'Moderate',
      icon: 'fa-meh-o',
      className: 'bkg--yellow',
      sortOrder: 1
    },
    {
      from: 60, to: 80,
      remark: 'High',
      icon: 'fa-smile-o',
      className: 'bkg--green',
      sortOrder: 0
    },
    {
      from: 80, to: 100,
      remark: 'Very high',
      icon: 'fa-smile-o',
      className: 'bkg--green',
      sortOrder: 0
    }
  ],
  pollutionScale: [
    {
      from: 0, to: 40,
      remark: 'Low',
      icon: 'fa-smile-o',
      className: 'bkg--green',
      sortOrder: 0
    },
    {
      from: 40, to: 60,
      remark: 'Moderate',
      icon: 'fa-meh-o',
      className: 'bkg--yellow',
      sortOrder: 1
    },
    {
      from: 60, to: 80,
      remark: 'High',
      icon: 'fa-frown-o',
      className: 'bkg--red',
      sortOrder: 2
    },
    {
      from: 80, to: 100,
      remark: 'Very high',
      icon: 'fa-frown-o',
      className: 'bkg--red',
      sortOrder: 2
    }
  ],
  healthCare: [
    {
      from: 0, to: 40,
      remark: 'Really bad',
      icon: 'fa-frown-o',
      className: 'bkg--red',
      sortOrder: 2
    },
    {
      from: 40, to: 60,
      remark: 'Average',
      icon: 'fa-meh-o',
      className: 'bkg--yellow',
      sortOrder: 1
    },
    {
      from: 60, to: 80,
      remark: 'Great',
      icon: 'fa-smile-o',
      className: 'bkg--green',
      sortOrder: 0
    },
    {
      from: 80, to: 100,
      remark: 'Awesome',
      icon: 'fa-smile-o',
      className: 'bkg--green',
      sortOrder: 0
    }
  ],
  qualityOfLife: [
    {
      from: 0, to: 35,
      remark: 'Very low',
      icon: 'fa-frown-o',
      className: 'bkg--red',
      sortOrder: 2
    },
    {
      from: 35, to: 65,
      remark: 'Low',
      icon: 'fa-frown-o',
      className: 'bkg--red',
      sortOrder: 2
    },
    {
      from: 65, to: 100,
      remark: 'Medium',
      icon: 'fa-meh-o',
      className: 'bkg--yellow',
      sortOrder: 1
    },
    {
      from: 100, to: 135,
      remark: 'High',
      icon: 'fa-smile-o',
      className: 'bkg--green',
      sortOrder: 0
    },
    {
      from: 135, to: 1000,
      remark: 'Very high',
      icon: 'fa-smile-o',
      className: 'bkg--green',
      sortOrder: 0
    }
  ],
  costOfLiving: [
    {
      from: 0, to: 40,
      remark: 'Very low',
      icon: 'fa-smile-o',
      className: 'bkg--green',
      sortOrder: 0
    },
    {
      from: 40, to: 65,
      remark: 'Low',
      icon: 'fa-smile-o',
      className: 'bkg--green',
      sortOrder: 0
    },
    {
      from: 65, to: 80,
      remark: 'Moderate',
      icon: 'fa-meh-o',
      className: 'bkg--yellow',
      sortOrder: 1
    },
    {
      from: 80, to: 110,
      remark: 'High',
      icon: 'fa-frown-o',
      className: 'bkg--red',
      sortOrder: 2
    },
    {
      from: 110, to: 1000,
      remark: 'Very high',
      icon: 'fa-frown-o',
      className: 'bkg--red',
      sortOrder: 2
    }
  ],
  safety: [
    {
      from: 0, to: 40,
      remark: 'Poor',
      icon: 'fa-frown-o',
      className: 'bkg--red',
      sortOrder: 2
    },
    {
      from: 40, to: 60,
      remark: 'A little sketchy',
      icon: 'fa-meh-o',
      className: 'bkg--yellow',
      sortOrder: 1
    },
    {
      from: 60, to: 80,
      remark: 'Great',
      icon: 'fa-smile-o',
      className: 'bkg--green',
      sortOrder: 0
    },
    {
      from: 80, to: 100,
      remark: 'Very safe',
      icon: 'fa-smile-o',
      className: 'bkg--green',
      sortOrder: 0
    }
  ]
};

export default scales;
