import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sweetalerts',
  templateUrl: './sweetalerts.component.html',
  styleUrls: ['./sweetalerts.component.css']
})
export class SweetalertsComponent implements OnInit {

  constructor() { }

  basicAlert() {
    Swal.fire("Any fool can use a computer")
  }
  withTitle() {
    Swal.fire({
      title: "The Internet?",
      text: "That thing is still around?"

    })
  }
  footerAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
  topStart() {
    Swal.fire ({
      position: "top-start",
      text: "Your work has been saved"
    })
  }
  topEnd() {
    Swal.fire ({
      position: "top-end",
      text: "Your work has been saved"
    })
  }
  bottomStart() {
    Swal.fire ({
      position: "bottom-start",
      text: "Your work has been saved"
    })
  }
  bottomEnd() {
    Swal.fire ({
      position: "bottom-end",
      text: "Your work has been saved"
    })
  }
  typeSuccess() {
    Swal.fire ({
      title: "Success",
      text: "You clicked the button!"
    })
  }
  typeInfo() {
    Swal.fire ({
      title: "Info",
      text: "You clicked the button!"
    })
  }
  typeWarning() {
    Swal.fire ({
      title: "Warning",
      text: "You clicked the button!"
    })
  }
  typeError() {
    Swal.fire ({
      title: "Error",
      text: "You clicked the button!"
    })
  }
  autoClose() {
    let timerInterval
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          Swal.getHtmlContainer().querySelector('b').textContent = Swal.getTimerLeft().toString()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }
  outsideClick() {
    Swal.fire ({
      title: "Click outside to close!",
      text: "This is a cool message!"
    })
  }
  async promptFunction() {
    const steps = ['1', '2', '3']
    const swalQueueStep = Swal.mixin({
      confirmButtonText: 'Forward',
      cancelButtonText: 'Back',
      progressSteps: steps,
      input: 'text',
      reverseButtons: true,
      validationMessage: 'This field is required'
    })
    
    const values = []
    let currentStep
    for (currentStep = 0; currentStep < steps.length;) {
      const result = await swalQueueStep.fire({
        title: `Question ${steps[currentStep]}`,
        inputValue: values[currentStep],
        showCancelButton: currentStep > 0,
        currentProgressStep: currentStep
      })
    
      if (result.value) {
        values[currentStep] = result.value
        currentStep++
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        currentStep--
      } else {
        break
      }
    }
    
    if (currentStep === steps.length) {
      Swal.fire(JSON.stringify(values))
    }
    
  }
  confirmText() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  confirmColor() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  ngOnInit(): void {
  }

}
