import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { educations, experiences } = this.props;

    const experienceItems = experiences.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}{" "}
        </p>
        <p>
          <strong>Position: </strong> {exp.title}
        </p>
        <p>
          {" "}
          {exp.location === null ? null : (
            <span>
              <strong>Location: </strong> {exp.location}
            </span>
          )}{" "}
        </p>
        <p>
          {" "}
          {exp.description === null ? null : (
            <span>
              <strong>Description: </strong> {exp.description}
            </span>
          )}{" "}
        </p>
      </li>
    ));

    const educationItems = educations.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}{" "}
        </p>
        <p>
          <strong>Degree: </strong> {edu.degree}
        </p>
        <p>
          <strong>Field of Study: </strong> {edu.fieldOfStudy}
        </p>
        <p>
          {" "}
          {edu.description === null ? null : (
            <span>
              <strong>Description: </strong> {edu.description}
            </span>
          )}{" "}
        </p>
      </li>
    ));
    return (
      <div>
        <div class="row">
          <div class="col-md-6">
            <h3 class="text-center text-info">Experience</h3>
            <ul class="list-group">{experienceItems}</ul>
          </div>
          <div class="col-md-6">
            <h3 class="text-center text-info">Education</h3>
            <ul class="list-group">{educationItems}</ul>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileCreds;
