import { supabase } from '@/lib/supabase';

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  message: string;
  gdprConsent: boolean;
}

export const contactService = {
  async submitContact(submission: ContactSubmission): Promise<void> {
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        message: submission.message,
        gdpr_consent: submission.gdprConsent
      });

    if (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }
};