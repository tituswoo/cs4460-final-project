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
  ]
};

export default scales;
